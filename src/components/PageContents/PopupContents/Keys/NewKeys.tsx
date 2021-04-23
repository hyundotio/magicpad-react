import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import PasswordInput from "../../../Universal/PasswordInput";
import WebWorker from "../../../../webworker";
import { encodeSteg } from "../../../Steganography/Steg";
import { validateEmail } from "../../../Universal/Helpers/EmailValidator";
import { stringTruncator } from "../../../Universal/Helpers/StringTruncator";
import { revokeBlob, dataURItoBlobURL } from "../../../FileOutput/BlobHandler";
import { PUBLIC_KEY_IMG_BASE } from "../../../KeyRefBase64/PublicKeyRef";
import { PRIVATE_KEY_IMG_BASE } from "../../../KeyRefBase64/PrivateKeyRef";
import { key as openpgpKey } from "openpgp";

import { loadPrivateKey } from "../../../../actions/SessionActions";

import { GeneratedKeys, KeyDownloadLinks } from "../../../../@types/KeysTypes";
import { StegInput } from "../../../../@types/StegTypes";

interface Props {
  loadPrivateKey: typeof loadPrivateKey;
}

const PopupContentsKeysNewKeys : React.FunctionComponent<Props> = props => {
  //Reducer, set private Key (owner);
  const initialDownloadLinks = {publicKey: '#', publicKeySteg: '#', privateKey: '#', privateKeySteg: '#'};
  const initialKeys = {publicKey: '', privateKey: ''};
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [filenameValue, setFilenameValue] = useState("");
  const [downloadLinks, setDownloadLinks] = useState<KeyDownloadLinks>({...initialDownloadLinks});
  const [isWorking, setIsWorking] = useState(false);
  const [formIsReady, setFormIsReady] = useState(false);
  const [keysGenerated, setKeysGenerated] = useState(false);
  const [importKeyWithDownload, setImportKeyWithDownload] = useState(true);

  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKeys>({...initialKeys});

  const pgpWebWorker = new WebWorker();

  useEffect(() => {
    if(validateEmail(emailValue) && nameValue.trim().length && passwordValue.trim().length){
      setFormIsReady(true);
    } else {
      setFormIsReady(false);
    }
  }, [nameValue, emailValue, passwordValue]);

  function resetKeyForm() {
    setDownloadLinks({...initialDownloadLinks});
    setGeneratedKeys({...initialKeys});
    setFormIsReady(false);
    setKeysGenerated(false);
    setIsWorking(false);
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
  }

  async function prepareSteg(img: HTMLImageElement, pgpKey: string, keyType: string){
    const keyInit = await openpgpKey.readArmored(pgpKey);
    const imgCanvas = document.createElement("canvas");
    const imgContext = imgCanvas.getContext("2d");
    imgContext!.canvas.width = img.width;
    imgContext!.canvas.height = img.height;
    imgContext!.drawImage(img, 0, 0, img.width, img.height);
    imgContext!.font = '11px IBM Plex Mono';
    imgContext!.fillStyle = '#0062ff';
    //No types defined in the OpenPGP Type package. Perhaps PR one.
    //@ts-expect-error
    const emailStr = keyInit.keys[0].users[0].userId.email ? stringTruncator(keyInit.keys[0].users[0].userId.email) : 'Converted key';
    imgContext!.fillText(emailStr, 14, 55);
    const stegKey = await encodeSteg(pgpKey, imgCanvas.toDataURL("image/png"));
    if (keyType === 'publicKey') {
      setDownloadLinks((currentDownloadLinks) => ({...currentDownloadLinks, publicKeySteg: stegKey}));
    } else {
      setDownloadLinks((currentDownloadLinks) => ({...currentDownloadLinks, privateKeySteg: stegKey}));
    }
  }

  async function handleKeyGeneration() {
    setIsWorking(true);
    for (const link in downloadLinks) revokeBlob(link);
    const asyncGeneratedKeys = await pgpWebWorker.generateKeys({name: nameValue, email: emailValue, password: passwordValue});
    setGeneratedKeys(asyncGeneratedKeys);
    for (const keyType in asyncGeneratedKeys) {
      const pgpKey = asyncGeneratedKeys[keyType];
      if(pgpKey){
        const img = document.createElement("img");
        img.onload = () => prepareSteg(img, pgpKey, keyType);
        img.src = keyType === 'publicKey' ? PUBLIC_KEY_IMG_BASE : PRIVATE_KEY_IMG_BASE as string;
      }
    }
    const filename = emailValue.replace('@','AT').replace('.','DOT');
    const privateKeyUrl = dataURItoBlobURL(`data:application/octet-stream;base64;filename=${filename}_privateKey.asc,${btoa(generatedKeys.privateKey)}`);
    const publicKeyUrl = dataURItoBlobURL(`data:application/octet-stream;base64;filename=${filename}_pubicKey.asc,${btoa(generatedKeys.publicKey)}`);
    setFilenameValue(filename);
    setDownloadLinks((currentDownloadLinks) => ({...currentDownloadLinks, publicKey: publicKeyUrl, privateKey: privateKeyUrl}));
    setKeysGenerated(true);
    setIsWorking(false);
  }

  function handlePrivateKeyDownload(){
    importKeyWithDownload && props.loadPrivateKey(generatedKeys.privateKey);
  }

  return (
    <div className={`popup-content keys-new-keys${isWorking ? ' keys-generating' : ''}`}>
      New keys
      { isWorking ? <div className={`new-key-container-loading-container`} /> : null }
      { !keysGenerated ?
        <div className={`new-key-container-page-1${formIsReady ? '' : ' active'}`}>
          <input type="text" value={nameValue} placeholder="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameValue(e.target.value)} />
          <input type="email" value={emailValue} placeholder="E-mail" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)} />
          <PasswordInput passwordValue={passwordValue} setPasswordValue={(input: string) => setPasswordValue(input)} />
          <button disabled={!formIsReady || isWorking} onClick={handleKeyGeneration}>Generate keys</button>
        </div>
        :
        <div className={`new-key-container-page-2${formIsReady ? ' active' : ''}`}>
          <a href={downloadLinks.publicKey} download={`${filenameValue}_publicKey.asc`} onClick={handlePrivateKeyDownload}>Download public key</a>
          <a href={downloadLinks.privateKey} download={`${filenameValue}_privateKey.asc`}>Download private key</a>
          <a href={downloadLinks.publicKeySteg} download={`${filenameValue}_publicKey.png`}>Download public steg key</a>
          <a href={downloadLinks.privateKeySteg} download={`${filenameValue}_privateKey.png`} onClick={handlePrivateKeyDownload}>Download private steg key</a>

          <label htmlFor="new-key-private-import">
            Import private key with download
            <input defaultChecked={importKeyWithDownload}
                   value={importKeyWithDownload ? "checked" : "unchecked"}
                   onChange={() => setImportKeyWithDownload(!importKeyWithDownload)}
                   type="checkbox"
            />
          </label>
          <button onClick={resetKeyForm}>Clear keys and restart</button>
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadPrivateKey: (privateKey: string) => dispatch(loadPrivateKey(privateKey))
  }
};

export default connect(null, mapDispatchToProps)(PopupContentsKeysNewKeys);
