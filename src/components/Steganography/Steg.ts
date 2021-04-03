import { StegInput } from "../../@types/StegTypes";

const stegUtil_isPrime = function(n: number) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n % 2 === 0) return (n === 2);
  if (n % 3 === 0) return (n === 3);
  const m = Math.sqrt(n);
  for (let i = 5; i <= m; i += 6) {
    if (n % i === 0) return false;
    if (n % (i+2) === 0) return false;
  }
  return true;
}

const stegUtil_findNextPrime = function(n: number) {
  for (let i = n; true; i += 1)
    if(stegUtil_isPrime(i)) return i;
}

/*
const stegUtil_sum = function(func: Function, end: number, options) {
  let sum = 0;
  options = options || {};
  for(let i = options.start || 0; i < end; i += (options.inc || 1))
    sum += func(i) || 0;

  return (sum === 0 && options.defValue ? options.defValue : sum);
}

const stegUtil_product = function(func, end, options) {
  let prod = 1;
  options = options || {};
  for(let i = options.start || 0; i < end; i += (options.inc || 1))
    prod *= func(i) || 1;

  return (prod === 1 && options.defValue ? options.defValue : prod);
}

const stegUtil_createArrayFromArgs = function(args, index, threshold) {
  let ret = new Array(threshold - 1);
  for(let i = 0; i < threshold; i += 1)
    ret[i] = args(i >= index ? i + 1 : i);

  return ret;
}

*/

const stegUtil_loadImg =  async (url: StegInput): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    //@ts-ignore
    image.src = url;
  })
}

const STEG_CONFIG = {
  t: 3,
  threshold: 1,
  codeUnitSize: 16,
  args: function(i: number) { return i + 1; },
  messageDelimiter: function(modMessage: number[], threshold: number) {
            let delimiter = new Array(threshold * 3);
            for(let i = 0; i < delimiter.length; i += 1)
              delimiter[i] = 255;

            return delimiter;
          },
  messageCompleted: function(data: Uint8ClampedArray, i: number, threshold: number) {
            let done = true;
            for(let j = 0; j < 16 && done; j += 1) {
              done = done && (data[i + j * 4] === 255);
            }
            return done;
          }
};

export function calculateStegCapacity(image: HTMLImageElement): number {
  return STEG_CONFIG.t * image.width * image.height / STEG_CONFIG.codeUnitSize >> 0;
};

export async function encodeSteg(message: string, image: StegInput): Promise<string> {
  // Handle image url
  let imageElement: HTMLImageElement;
  if(image) {
    imageElement = await stegUtil_loadImg(image);
  } else {
    throw new Error('Invalid input: The input is neither an URL string nor an image.');
  }

  let t = STEG_CONFIG.t,
    threshold = STEG_CONFIG.threshold,
    codeUnitSize = STEG_CONFIG.codeUnitSize,
    prime = stegUtil_findNextPrime(Math.pow(2,t)),
    args = STEG_CONFIG.args,
    messageDelimiter = STEG_CONFIG.messageDelimiter;

  if(!t || t < 1 || t > 7) throw new Error('Invalid option: Parameter t = " + t + " is not valid: 0 < t < 8');

  let shadowCanvas = document.createElement('canvas'),
    shadowCtx = shadowCanvas.getContext('2d');

  shadowCanvas.style.display = 'none';
  shadowCanvas.width = imageElement.width;
  shadowCanvas.height = imageElement.height;
  if(shadowCtx !== null){
    shadowCtx.drawImage(imageElement, 0, 0);

    let imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height),
      data = imageData.data;

    // bundlesPerChar ... Count of full t-bit-sized bundles per Character
    // overlapping ... Count of bits of the currently handled character which are not handled during each run
    // dec ... UTF-16 Unicode of the i-th character of the message
    // curOverlapping ... The count of the bits of the previous character not handled in the previous run
    // mask ... The raw initial bitmask, will be changed every run and if bits are overlapping
    let bundlesPerChar = codeUnitSize / t >> 0,
      overlapping = codeUnitSize % t,
      modMessage = [],
      decM, oldDec, oldMask, left, right,
      dec, curOverlapping, mask;

    let i, j;
    for(i = 0; i <= message.length; i += 1) {
      dec = message.charCodeAt(i) || 0;
      curOverlapping = (overlapping * i) % t;
      if(curOverlapping > 0 && oldDec) {
        // Mask for the new character, shifted with the count of overlapping bits
        mask = Math.pow(2,t - curOverlapping) - 1;
        // Mask for the old character, i.e. the t-curOverlapping bits on the right
        // of that character
        oldMask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -curOverlapping));
        left = (dec & mask) << curOverlapping;
        right = (oldDec & oldMask) >> (codeUnitSize - curOverlapping);
        modMessage.push(left + right);

        if(i < message.length) {
          mask = Math.pow(2, 2 * t - curOverlapping) * (1 - Math.pow(2, -t));
          for(j = 1; j < bundlesPerChar; j += 1) {
            decM = dec & mask;
            modMessage.push(decM >> (((j - 1) * t)+(t - curOverlapping)));
            mask <<= t;
          }
          if((overlapping * (i + 1)) % t === 0) {
            mask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -t));
            decM = dec & mask;
            modMessage.push(decM >> (codeUnitSize - t));
          }
          else if(((((overlapping * (i + 1)) % t) + (t - curOverlapping)) <= t)) {
            decM = dec & mask;
            modMessage.push(decM >> (((bundlesPerChar - 1) * t) + (t - curOverlapping)));
          }
        }
      }
      else if(i < message.length) {
        mask = Math.pow(2, t) - 1;
        for(j = 0; j < bundlesPerChar; j += 1) {
          decM = dec & mask;
          modMessage.push(decM >> (j * t));
          mask <<= t;
        }
      }
      oldDec = dec;
    }

    // Write Data
    let offset, index, subOffset, delimiter = messageDelimiter(modMessage,threshold),
      q, qS;
    for (offset = 0; (offset+threshold) * 4 <= data.length && (offset + threshold) <= modMessage.length; offset += threshold) {
      qS = [];
      for (i = 0; i < threshold && i + offset < modMessage.length; i += 1) {
        q = 0;
        for (j = offset; j < threshold + offset && j < modMessage.length; j += 1)
          q += modMessage[j] * Math.pow(args(i), j - offset);
        qS[i] = (255 - prime + 1) + (q % prime);
      }
      for(i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4)
        data[i + 3] = qS[(i / 4) % threshold];

      subOffset = qS.length;
    }
    // Write message-delimiter
    if(offset && subOffset){
      for(index = (offset + subOffset); index - (offset + subOffset) < delimiter.length && (offset + delimiter.length) * 4 < data.length; index += 1)
        data[(index * 4) + 3] = delimiter[index - (offset + subOffset)];
      // Clear remaining data
      for(i = ((index + 1) * 4) + 3; i < data.length; i += 4) data[i] = 255;

      //imageData.data = data;
      shadowCtx.putImageData(imageData, 0, 0);

      return shadowCanvas.toDataURL();
    }
  } else {
    throw new Error('Interal error: Could not initialize shadow context');
  }
  return '';
};

export async function decodeSteg(image: StegInput): Promise<string> {
  // Handle image url
  let imageElement: HTMLImageElement;
  if(image) {
    imageElement = await stegUtil_loadImg(image);
  } else {
    throw new Error('Invalid input: The input is neither an URL string nor an image.');
  }

  let t = STEG_CONFIG.t,
    threshold = STEG_CONFIG.threshold,
    codeUnitSize = STEG_CONFIG.codeUnitSize,
    prime = stegUtil_findNextPrime(Math.pow(2, t)),
    args = STEG_CONFIG.args,
    messageCompleted = STEG_CONFIG.messageCompleted;

  if(!t || t < 1 || t > 7) throw new Error('Invalid option: Parameter t = " + t + " is not valid: 0 < t < 8');

  let shadowCanvas = document.createElement('canvas'),
    shadowCtx = shadowCanvas.getContext('2d');

  shadowCanvas.style.display = 'none';
  shadowCanvas.width = imageElement.width;
  shadowCanvas.height = imageElement.height;

  if(shadowCtx !== null){
    shadowCtx.drawImage(imageElement, 0, 0);
    let imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height),
      data = imageData.data,
      modMessage = [],
      q;

    let i, k, done;
    if (threshold === 1) {
      for(i = 3, done = false; !done && i < data.length && !done; i += 4) {
        done = messageCompleted(data, i, threshold);
        if(!done) modMessage.push(data[i] - (255 - prime + 1));
      }
    } else {
      /*for(k = 0, done=false; !done; k+=1) {
        q = [];
        for(i=(k*threshold*4)+3; i<(k+1)*threshold*4 && i<data.length && !done; i+=4) {
          done = messageCompleted(data,i,threshold);
          if(!done) q.push(data[i]-(255-prime+1)); // at Array index (i-((k*threshold*4)+3))/4
        }
        if(q.length === 0) continue;
        // Calculate the coefficients which are the same for any order of the letiable, but different for each argument
        // i.e. for args[0] coeff=q[0]*(args[1]-args[2])*(args[1]-args[3])*...(args[1]-args[threshold-1])*...*(args[threshold-1]-args[1])*...*(args[threshold-1]-args[threshold-2])
        let letiableCoefficients = (function(i) {
          if(i >= q.length) return [];
          return [q[i]*
          stegUtil_product(function(j) {
          if(j !== i) {
            return stegUtil_product(function(l) {
            if(l !== j) return (args(j) - args(l));
            }, q.length);
          }
          }, q.length)].concat(arguments.callee(i+1));
        }(0));
        // Calculate the coefficients which are different for each order of the letiable and for each argument
        // i.e. for order=0 and args[0] coeff=args[1]*args[2]*...*args[threshold-1]
        let orderletiableCoefficients = function(order, letIndex) {
          let workingArgs = stegUtil_createArrayFromArgs(args,letIndex,q.length), maxRec = q.length - (order+1);
          return (function(startIndex, endIndex, recDepth) {
          let recall = arguments.callee;
          return stegUtil_sum(function(i) {
            if(recDepth < maxRec)
            return workingArgs[i]*recall(i+1,startIndex+order+2,recDepth+1);
          }, endIndex, {"start": startIndex, "defValue": 1});
          }(0,order+1,0));
        };
        // Calculate the common denominator of the whole term
        let commonDenominator = stegUtil_product(function(i) {
          return stegUtil_product(function(j) {
          if(j !== i) return (args(i) - args(j));
          }, q.length);
        }, q.length);

        for(i = 0; i < q.length; i+=1) {
          modMessage.push((((Math.pow(-1,q.length-(i+1))*stegUtil_sum(function(j) {
          return orderletiableCoefficients(i,j)*
          letiableCoefficients[j];
          }, q.length))%prime)+prime)%prime); // ?divide by commonDenominator?
        }
      }
    */}

    let message = "", charCode = 0, bitCount = 0, mask = Math.pow(2, codeUnitSize) - 1;
    for(i = 0; i < modMessage.length; i += 1) {
      charCode += modMessage[i] << bitCount;
      bitCount += t;
      if(bitCount >= codeUnitSize) {
        message += String.fromCharCode(charCode & mask);
        bitCount %= codeUnitSize;
        charCode = modMessage[i] >> (t-bitCount);
      }
    }
    if(charCode !== 0) message += String.fromCharCode(charCode & mask);

    return message;
  }
  return '';
};
