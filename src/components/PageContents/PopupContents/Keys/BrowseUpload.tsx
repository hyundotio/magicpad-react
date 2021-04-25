import React, { useState, useEffect } from "react";
import { StegInput } from "../../../../@types/StegTypes"
import { HKP as openpgpHKP, key as openpgpKey } from "openpgp";
import { bufferToHex, styleFingerprintString } from "../../../Universal/Helpers/PGPFingerprintParser";
import { encodeSteg, decodeSteg } from "../../../Steganography/Steg";
import { isPublicKey } from "../../../Cryptography/Verify";
import { KEY_SERVER, KEY_SERVER_PROTOCOL, KEY_SERVER_DOWNLOAD_URL } from "../../../Universal/KeyServer";

const PopupContentsKeysBrowseUpload : React.FunctionComponent = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("#");
  const [uploadedKey, setUploadedKey] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const hkpInstance = new openpgpHKP(`${KEY_SERVER_PROTOCOL}${KEY_SERVER}`);
  //Upload string to Server + Handle response
  async function handleStegDecode(input: StegInput){
    setIsWorking(true);
    const decodedKey = await decodeSteg(input);
    if(isPublicKey(decodedKey)){
      setTextareaValue(decodedKey);
      setIsWorking(false);
    } else {
      resetState();
    }
  }

  function handleTextareaOnChange(e: React.FormEvent<HTMLTextAreaElement>) {
    const input = e.target as HTMLTextAreaElement;
    setTextareaValue(input.value);
  }

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
            if(isPublicKey(pgpKey)){
              setTextareaValue(pgpKey);
              setIsWorking(false);
            } else {
              resetState();
            }
          }
        }
        fileReader.readAsText(file);
      }
    }
  }

  async function handleUpload(){
    if(isPublicKey(textareaValue)){
      const hkpUpload = await hkpInstance.upload(textareaValue);
      const initKey = await openpgpKey.readArmored(textareaValue);
      //@ts-ignore
      const fingerprintBuffer = new Uint8Array(initKey.keys[0].primaryKey.fingerprint);
      const fingerprintString = bufferToHex(fingerprintBuffer);
      const url = `${KEY_SERVER_PROTOCOL}${KEY_SERVER}${KEY_SERVER_DOWNLOAD_URL}${fingerprintString}`;
      setUploadedKey(textareaValue);
      setDownloadUrl(url);
    }
  }

  function resetState(){
    setTextareaValue("");
    setUploadedKey("");
    setDownloadUrl("");
    setIsWorking(false);
  }

  return (
    <div className="popup-content keys-browse-upload">
      Browse upload
      <textarea placeholder="Paste public key here" value={textareaValue} onChange={handleTextareaOnChange} />
      Import key
      <input accept=".asc,.png"
             type="file"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      />
      <button onClick={handleUpload} disabled={!textareaValue || isWorking || (textareaValue.trim() === uploadedKey.trim())}>Upload</button>
      {downloadUrl !== '#' ? <a href={downloadUrl}>Download uploaded key</a> : null}
    </div>
  )
}

export default PopupContentsKeysBrowseUpload;
