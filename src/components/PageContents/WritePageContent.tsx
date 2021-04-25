import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';
import { encodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";
import { Keys } from "../../@types/KeysTypes";
import { ApplicationState } from "../../Store";
import { WritePageState } from "../../@types/StateTypes";
import { setWritePageState } from "../../actions/SessionActions";

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
  setProcessedStegLink: Function;
  processedStegLink: string;
  loadedKeys: Keys;
  setWritePageState: typeof setWritePageState;
  writePageState: WritePageState;
}

const WritePageContent : React.FunctionComponent<Props> = props => {
  const [signMessage, setSignMessage] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [magicPostLink, setMagicPostLink] = useState("");
  const [stegFile, setStegFile] = useState<Blob | undefined>(undefined);
  const [processed, setProcessed] = useState(false);
  const [stegProcessed, setStegProcessed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const pgpWebWorker = new WebWorker();
  const stegFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      //If isWorking, handle specially.
      const writePageState: WritePageState = {
        signMessage: signMessage,
        textareaValue: textareaValue,
        processedStegLink: props.processedStegLink
      }
      props.setWritePageState(writePageState);
    };
  }, [signMessage, textareaValue, props]);

  const handleSignOnClick = function(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setSignMessage(input.checked);
  }

  function generateMagicPostLink(encryptedText: string){
    const url = `https://www.magicpost.io/post.php?to=${encodeURIComponent(props.loadedKeys.publicKeyFingerprint)}&from=${encodeURIComponent(props.loadedKeys.privateKeyFingerprint)}&msg=${encodeURIComponent(encryptedText)}`;
    setMagicPostLink(url);
  }

  async function handleEncrypt(){
    setStegProcessed(false);
    setProcessed(false);
    setIsWorking(true);
    const processedData = (await pgpWebWorker.encryptString(textareaValue, passwordValue, signMessage,
                                                           props.loadedKeys.publicKey, props.loadedKeys.privateKey)).trim();
    if(processedData){
      props.setProcessedContent(processedData);
      generateMagicPostLink(processedData);
      setProcessed(true);
      if(stegFile){
        const fileReader = new FileReader();
        fileReader.onloadend = (e: Event) => fileReader.result && handleStegEncode(processedData, fileReader.result);
        fileReader.readAsDataURL(stegFile);
      } else {
        setIsWorking(false);
        props.setPopupVisibility(true);
      }
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file) setStegFile(file);
  }

  function resetSteg(){
    if(stegFileRef !== null && stegFileRef.current) stegFileRef.current.value = "";
    setStegFile(undefined);
  }

  async function handleStegEncode(message: string, stegInput: StegInput){
    const encodedSteg = await encodeSteg(message, stegInput);
    props.setProcessedStegLink(encodedSteg);
    setIsWorking(false);
    setStegProcessed(true);
  }

  return (
    <div className="page-content write-page">
        Write
        Import steg host: <input type="file" ref={stegFileRef} onChange={handleOnChange}  />
        Sign message: <input type="checkbox" onClick={handleSignOnClick} />
        {stegFile ? <button onClick={resetSteg}>Clear steganograph host</button> : null}
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
        <a href={magicPostLink ? magicPostLink : "https://www.magicpost.io/post.php"}>Post message to MagicPost anonymously</a>
        <button disabled={!processed || isWorking} onClick={() => props.setPopupVisibility(true)}>Open encrypted content</button>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    writePageState: state.appState.writePage,
    loadedKeys: state.appState.keys
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setWritePageState: (state: WritePageState) => dispatch(setWritePageState(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WritePageContent);
