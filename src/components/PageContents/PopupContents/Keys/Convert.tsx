import React, { useState } from "react";
import { StegInput } from "../../../../@types/StegTypes";
import { decodeSteg } from "../../../Steganography/Steg";
import { revokeBlob, dataURItoBlobURL } from "../../../FileOutput/BlobHandler";

const PopupContentsKeysConvert : React.FunctionComponent = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [convertedKeyDownloadLink, setConvertedKeyDownloadLink] = useState("");
  //Convert image to text
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onloadend = (e: Event) => fileReader.result && handleStegDecode(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }

  async function handleStegDecode(input: StegInput){
    revokeBlob(convertedKeyDownloadLink);
    const decodedMessage = await decodeSteg(input);
    setTextareaValue(decodedMessage);
    const url = dataURItoBlobURL(`data:application/octet-stream;base64;filename=convertedKey.asc,${btoa(decodedMessage)}`);
    setConvertedKeyDownloadLink(url);
  }
  
  return (
    <div className="popup-content keys-convert">
      Keys convert
      <input accept=".png"
             type="file"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      />
      <textarea placeholder="Import steg key to view contents as text." readOnly={true} value={textareaValue} />
      <a className={`${textareaValue.length > 1 ? 'disabled' : ''}`} href={convertedKeyDownloadLink}>Download</a>
    </div>
  )
}

export default PopupContentsKeysConvert;
