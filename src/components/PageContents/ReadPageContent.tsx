import React, {useState} from "react";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
}

const ReadPageContent : React.FunctionComponent<Props> = props => {
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [processed, setProcessed] = useState(false);
  const pgpWebWorker = new WebWorker();

  async function handleDecrypt(){
    const processedData = await pgpWebWorker.decryptString(textareaValue, passwordValue);
    if(processedData){
      props.setProcessedContent(processedData);
      setProcessed(true);
      props.setPopupVisibility(true);
    }
  }

  return (
    <>
      Read
      <PasswordInput setPasswordValue={setPasswordValue} />
      <TextareaInput setTextareaValue={setTextareaValue} />
      <button
        disabled={passwordValue.length === 0 || textareaValue.length === 0}
        onClick={handleDecrypt}
      >Decrypt</button>
      <button disabled={!processed} onClick={() => props.setPopupVisibility(true)}>Open decrypted content</button>
    </>
  )
}

export default ReadPageContent
