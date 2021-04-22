import React, { useState } from "react";
import { StegInput } from "../../../../@types/StegTypes";
import { encodeSteg, decodeSteg } from "../../../Steganography/Steg";
import { revokeBlob, dataURItoBlobURL } from "../../../FileOutput/BlobHandler";
import { isPublicKey, isPrivateKey } from "../../../Cryptography/VerifyKeys";
import { PUBLIC_KEY_IMG_BASE } from "../../../KeyRefBase64/PublicKeyRef";
import { PRIVATE_KEY_IMG_BASE } from "../../../KeyRefBase64/PrivateKeyRef";
import { key as openpgpKey } from "openpgp";
import { stringTruncator } from "../../../Universal/Helpers/StringTruncator";


const PopupContentsKeysConvert : React.FunctionComponent = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [convertedKeyDownloadLink, setConvertedKeyDownloadLink] = useState("");
  const [convertedFilename, setConvertedFilename] = useState("");
  //Convert image to text
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file){
      const fileReader = new FileReader();
      if(file.type.indexOf('png') !== -1){
        fileReader.onloadend = (e: Event) => fileReader.result && handleStegDecode(fileReader.result);
        fileReader.readAsDataURL(file);
      } else {
        fileReader.onloadend = (e: Event) => {
          if(fileReader.result){
            const pgpKey = fileReader.result as string;
            const img = document.createElement("img");
            if(isPublicKey(pgpKey)){
              img.src = PUBLIC_KEY_IMG_BASE;
            } else if (isPrivateKey(pgpKey)){
              img.src = PRIVATE_KEY_IMG_BASE;
            } else {
              resetState();
            }
            img.onload = () => prepareSteg(img, pgpKey);
          }
        }
        fileReader.readAsText(file);
      }
    }
  }

  function resetState(){
    setConvertedFilename("");
    setTextareaValue("");
    setConvertedKeyDownloadLink("#");
    revokeBlob(convertedKeyDownloadLink);
  }

  async function prepareSteg(img: HTMLImageElement, pgpKey: string){
    revokeBlob(convertedKeyDownloadLink);
    const keyInit = await openpgpKey.readArmored(pgpKey);
    //No types defined in the OpenPGP Type package. Perhaps PR one.
    //@ts-expect-error
    const emailStr = keyInit.keys[0].users[0].userId.email ? stringTruncator(keyInit.keys[0].users[0].userId.email) : 'Converted key';
    const filename = `${emailStr.replace('@','AT').replace('.','DOT')}_converted.png`;
    const imgCanvas = document.createElement("canvas");
    const imgContext = imgCanvas.getContext("2d");
    imgContext!.canvas.width = img.width;
    imgContext!.canvas.height = img.height;
    imgContext!.drawImage(img, 0, 0, img.width, img.height);
    imgContext!.font = '11px IBM Plex Mono';
    imgContext!.fillStyle = '#0062ff';
    imgContext!.fillText(emailStr, 14, 55);
    const stegKey = await encodeSteg(pgpKey, imgCanvas.toDataURL("image/png"));
    setConvertedFilename(filename);
    setTextareaValue(pgpKey);
    setConvertedKeyDownloadLink(stegKey);
  }

  async function handleStegDecode(input: StegInput){
    revokeBlob(convertedKeyDownloadLink);
    const decodedKey = await decodeSteg(input);
    if(isPublicKey(decodedKey) || isPrivateKey(decodedKey)){
      const keyInit = await openpgpKey.readArmored(decodedKey);
      //No types defined in the OpenPGP Type package. Perhaps PR one.
      //@ts-expect-error
      const emailStr = keyInit.keys[0].users[0].userId.email ? stringTruncator(keyInit.keys[0].users[0].userId.email) : 'Converted key';
      const filename = `${emailStr.replace('@','AT').replace('.','DOT')}_converted.asc`;
      const url = dataURItoBlobURL(`data:application/octet-stream;base64;filename=${filename},${btoa(decodedKey)}`);
      setConvertedFilename(filename);
      setTextareaValue(decodedKey);
      setConvertedKeyDownloadLink(url);
    } else {
      resetState();
    }
  }

  return (
    <div className="popup-content keys-convert">
      Keys convert
      <input accept=".asc,.png"
             type="file"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      />
      <textarea placeholder="Import steg key to view contents as text." readOnly={true} value={textareaValue} />
      <a className={`${textareaValue.length > 1 ? 'disabled' : ''}`} href={convertedKeyDownloadLink} download={convertedFilename}>Download</a>
    </div>
  )
}

export default PopupContentsKeysConvert;
