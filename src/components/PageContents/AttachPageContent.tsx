import React, { useState } from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";
import PasswordInput from "../Universal/PasswordInput";
import WebWorker from '../../webworker';

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
}

const AttachPageContent : React.FunctionComponent<Props> = props => {
  const [passwordValue, setPasswordValue] = useState("");
  const [attachType, setAttachType] = useState("");
  const [fileReference, setFileReference] = useState<File | undefined>(undefined);
  const [processed, setProcessed] = useState(false);

  const handleAttachTypeOnClick = function(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setAttachType(input.value);
  }

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files !== null && input.files[0];
    file && setFileReference(file);
  }

  async function processDataAsync(data: ProcessedData){
    const pgpWebWorker = new WebWorker();
    let processedData: ProcessedData;
    if(attachType === 'encrypt'){
      processedData = await pgpWebWorker.encryptAttachment(data, passwordValue);
    } else {
      processedData = await pgpWebWorker.decryptAttachment(data, passwordValue);
    }
    props.setProcessedContent(processedData);
    setProcessed(true);
    props.setPopupVisibility(true);
  }

 const handleProcess = function() {
    if(fileReference){
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => e?.target!.result && processDataAsync(e.target.result);
      if(attachType === 'encrypt'){
        fileReader.readAsArrayBuffer(fileReference);
      } else {
        fileReader.readAsText(fileReference);
      }
    }
  }

  return (
    <div className="page-content attach-page">
      Attach
      <form>
        Encrypt <input name="attach_type" type="radio" value="encrypt" onClick={handleAttachTypeOnClick} />
        Decrypt <input name="attach_type" type="radio" value="decrypt" onClick={handleAttachTypeOnClick} />
        {attachType === "decrypt" ? <PasswordInput passwordValue={passwordValue} setPasswordValue={setPasswordValue} /> : null}
        <input type="file"
               onChange={handleFileOnChange}
        />
      </form>
      {
        attachType ?
        <div className="attach-options">
          <button
            disabled={
              attachType === "decrypt" ?
              ((fileReference === undefined) || passwordValue.length === 0) :
              (fileReference === undefined)
            }
            onClick={handleProcess}
          >Process attachment</button>
          <button disabled={!processed} onClick={() => props.setPopupVisibility(true)}>Open processed attachment</button>
        </div> :
        <div className="attach-init">Choose processing type above.</div>
      }
    </div>
  )
}

export default AttachPageContent
