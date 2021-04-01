import React, {useState} from "react";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
}

const WritePageContent : React.FunctionComponent<Props> = props => {
  const [signMessage, setSignMessage] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [processed, setProcessed] = useState(false);
  const pgpWebWorker = new WebWorker();

  function handleSignOnClick(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setSignMessage(input.checked);
  }

  async function handleEncrypt(){
    const processedData = await pgpWebWorker.encryptString(textareaValue, passwordValue, signMessage);
    if(processedData){
      props.setProcessedContent(processedData);
      setProcessed(true);
      props.setPopupVisibility(true);
    }
  }

  return (
    <>
        Write
        Sign message: <input type="checkbox" onClick={handleSignOnClick} />
        {signMessage ? <PasswordInput setPasswordValue={setPasswordValue} /> : null}
        <TextareaInput setTextareaValue={setTextareaValue} />
        <button
          disabled={
            signMessage ?
            passwordValue.length === 0 || textareaValue.length === 0 :
            textareaValue.length === 0
          }
          onClick={handleEncrypt}
          >
          Encrypt
        </button>
        <button disabled={!processed} onClick={() => props.setPopupVisibility(true)}>Open encrypted content</button>
    </>
  )
}

export default WritePageContent
