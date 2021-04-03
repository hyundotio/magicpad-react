import React, {useState} from "react";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import { decodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if(file !== null){
      const fileReader = new FileReader();
      fileReader.onloadend = function(e){
        e.target?.result! && handleDecode(e.target?.result!);
      }
      fileReader.readAsDataURL(file);
    }
  }

  async function handleDecode(input: StegInput){
    const decodedMessage = await decodeSteg(input);
    console.log(decodedMessage);
  }

  return (
    <div className="page-content read-page">
      Read
      Import steg: <input type="file" onChange={handleOnChange} />
      <PasswordInput setPasswordValue={setPasswordValue} />
      <TextareaInput setTextareaValue={setTextareaValue} />
      <button
        disabled={passwordValue.length === 0 || textareaValue.length === 0}
        onClick={handleDecrypt}
      >Decrypt</button>
      <button disabled={!processed} onClick={() => props.setPopupVisibility(true)}>Open decrypted content</button>
    </div>
  )
}

export default ReadPageContent
