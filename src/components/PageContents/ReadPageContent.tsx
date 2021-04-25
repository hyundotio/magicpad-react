import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import { decodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";
import { Keys } from "../../@types/KeysTypes";
import WebWorker from '../../webworker';
import { ApplicationState } from "../../Store";
import { ReadPageState } from "../../@types/StateTypes";
import { setReadPageState } from "../../actions/SessionActions";

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
  loadedKeys: Keys;
  setReadPageState: typeof setReadPageState;
  readPageState: ReadPageState;
}

const ReadPageContent : React.FunctionComponent<Props> = props => {
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [processed, setProcessed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const pgpWebWorker = new WebWorker();

  useEffect(() => {
    return () => {
      //If isWorking, handle specially.
      const readPageState = {
        textareaValue: textareaValue,
        verificationMessage: verificationMessage
      }
      props.setReadPageState(readPageState);
    };
  }, [textareaValue, verificationMessage, props]);

  async function handleDecrypt(){
    setIsWorking(true);
    const processedData = await pgpWebWorker.decryptString(textareaValue, passwordValue, props.loadedKeys.publicKey, props.loadedKeys.privateKey);
    if(processedData.decryptedMessage){
      props.setProcessedContent(processedData.decryptedMessage);
      setVerificationMessage(processedData.verificationMessage);
      setIsWorking(false);
      setProcessed(true);
      props.setPopupVisibility(true);
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onloadend = (e: Event) => fileReader.result && handleStegDecode(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }

  async function handleStegDecode(input: StegInput){
    const decodedMessage = await decodeSteg(input);
    setTextareaValue(decodedMessage);
  }

  return (
    <div className="page-content read-page">
      Read
      Import steg: <input type="file" onChange={handleOnChange} />
      {verificationMessage}
      <PasswordInput passwordValue={passwordValue} setPasswordValue={setPasswordValue} />
      <TextareaInput setTextareaValue={setTextareaValue} textareaValue={textareaValue} />
      <button
        disabled={passwordValue.length === 0 || textareaValue.length === 0 || isWorking}
        onClick={handleDecrypt}
      >
        Decrypt
      </button>
      <button disabled={!processed} onClick={() => props.setPopupVisibility(true)}>Open decrypted content</button>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    readPageState: state.appState.readPage,
    loadedKeys: state.appState.keys
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setReadPageState: (state: ReadPageState) => dispatch(setReadPageState(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadPageContent);
