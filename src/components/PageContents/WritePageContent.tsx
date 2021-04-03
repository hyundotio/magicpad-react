import React, {useState} from "react";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';
import { encodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
}

const WritePageContent : React.FunctionComponent<Props> = props => {
  const [signMessage, setSignMessage] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [stegFile, setStegFile] = useState<Blob | undefined>(undefined);
  const [processed, setProcessed] = useState(false);
  const pgpWebWorker = new WebWorker();

  const handleSignOnClick = function(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setSignMessage(input.checked);
  }

  async function handleEncrypt(){
    const processedData = await pgpWebWorker.encryptString(textareaValue, passwordValue, signMessage);
    if(processedData){
      props.setProcessedContent(processedData);
      setProcessed(true);
      if(stegFile){
        const fileReader = new FileReader();
        fileReader.onloadend = function(e){
          if(e.target?.result!) handleEncode(e.target?.result!);
        }
        fileReader.readAsDataURL(stegFile);
      }
      props.setPopupVisibility(true);
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if(file !== null) setStegFile(file);
  }

  async function handleEncode(input: StegInput){
    const encodedSteg = await encodeSteg('encrypted text', input);
    console.log(encodedSteg);
  }

  return (
    <div className="page-content write-page">
        Write
        Import steg host: <input type="file" onChange={handleOnChange} />
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
    </div>
  )
}

export default WritePageContent
