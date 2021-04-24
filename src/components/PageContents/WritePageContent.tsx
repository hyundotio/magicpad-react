import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';
import { encodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";
import { Keys } from "../../@types/KeysTypes";
import { ApplicationState } from "../../Store";

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
  loadedKeys: Keys;
}

const WritePageContent : React.FunctionComponent<Props> = props => {
  const [signMessage, setSignMessage] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [stegFile, setStegFile] = useState<Blob | undefined>(undefined);
  const [processedStegLink, setProcessedStegLink] = useState("#");
  const [processed, setProcessed] = useState(false);
  const [stegProcessed, setStegProcessed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const pgpWebWorker = new WebWorker();

  useEffect(() => {
    return () => {
      //If isWorking, handle specially.
      const writePageState = {
        signMessage: signMessage,
        textareaValue: textareaValue,
        processedStegLink: processedStegLink,
      }
    };
  }, []);

  const handleSignOnClick = function(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setSignMessage(input.checked);
  }

  async function handleEncrypt(){
    setStegProcessed(false);
    setProcessed(false);
    setIsWorking(true);
    const processedData = (await pgpWebWorker.encryptString(textareaValue, passwordValue, signMessage,
                                                           props.loadedKeys.publicKey, props.loadedKeys.privateKey)).trim();
    if(processedData){
      props.setProcessedContent(processedData);
      setProcessed(true);
      if(stegFile){
        const fileReader = new FileReader();
        fileReader.onloadend = (e: Event) => fileReader.result && handleStegEncode(processedData, fileReader.result);
        fileReader.readAsDataURL(stegFile);
      }
      stegFile ?
        processed && stegProcessed && props.setPopupVisibility(true) && setIsWorking(false) :
        processed && props.setPopupVisibility(true);
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file) setStegFile(file);
  }

  async function handleStegEncode(message: string, stegInput: StegInput){
    const encodedSteg = await encodeSteg(message, stegInput);
    setProcessedStegLink(encodedSteg);
    setStegProcessed(true);
  }

  return (
    <div className="page-content write-page">
        Write
        Import steg host: <input type="file" onChange={handleOnChange} />
        Sign message: <input type="checkbox" onClick={handleSignOnClick} />
        {signMessage ? <PasswordInput passwordValue={passwordValue} setPasswordValue={setPasswordValue} /> : null}
        <TextareaInput setTextareaValue={setTextareaValue} textareaValue={textareaValue} />
        <button
          disabled={
            signMessage ?
            passwordValue.length === 0 || textareaValue.length === 0 || isWorking:
            textareaValue.length === 0 || isWorking
          }
          onClick={handleEncrypt}
        >
          Encrypt
        </button>
        { processedStegLink !== '#' ? <a href={processedStegLink} download="steg_output.png">Download steg</a> : null}
        <button disabled={!processed || isWorking} onClick={() => props.setPopupVisibility(true)}>Open encrypted content</button>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    loadedKeys: state.userKeys.keys
  }
}

export default connect(mapStateToProps)(WritePageContent);
