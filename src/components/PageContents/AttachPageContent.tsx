import React, {useState} from "react";
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

  function handleAttachTypeOnClick(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setAttachType(input.value);
  }

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files !== null && input.files[0];
    file && setFileReference(file);
  }

  async function processDataAsync(data: ArrayBuffer | string){
    const pgpWebWorker = new WebWorker();
    let response: any;
    if(attachType === 'encrypt'){
      response = await pgpWebWorker.encryptAttachment(data, passwordValue);
    } else {
      response = await pgpWebWorker.decryptAttachment(data, passwordValue);
    }
    setProcessed(true);
    props.setPopupVisibility(true);
  }

  function handleProcess() {
    if(fileReference){
      const fileReader = new FileReader();
      fileReader.onloadend = (event) => event?.target!.result && processDataAsync(event.target.result);
      fileReader.readAsText(fileReference);
    }
  }

  return (
    <>
      Attach
      <form>
        Encrypt <input name="attach_type" type="radio" value="encrypt" onClick={handleAttachTypeOnClick} />
        Decrypt <input name="attach_type" type="radio" value="decrypt" onClick={handleAttachTypeOnClick} />
        {attachType === "decrypt" ? <PasswordInput setPasswordValue={setPasswordValue} /> : null}
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
    </>
  )
}

export default AttachPageContent
