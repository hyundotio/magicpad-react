import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { key as openpgpKey } from "openpgp";

import { ApplicationState } from "../../Store";

import { bufferToHex, styleFingerprintString } from "../Universal/Helpers/PGPFingerprintParser";

import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';

import { KeysPageState } from "../../@types/StateTypes";
import { KEYSPOPUPTYPES } from "../../@types/KeysPopupTypes";
import { Keys } from "../../@types/KeysTypes";
import { StegInput } from "../../@types/StegTypes";
import { loadPublicKey, loadPrivateKey, setKeysPageState } from "../../actions/SessionActions";

import { isPublicKey, isPrivateKey } from "../Cryptography/Verify";

import { encodeSteg, decodeSteg } from "../Steganography/Steg";

interface Props {
  loadPublicKey: typeof loadPublicKey;
  loadPrivateKey: typeof loadPrivateKey;
  setKeysPageState: typeof setKeysPageState;
  setPopupPage: Function;
  setPopupVisibility: Function;
  loadedKeys: Keys;
  keysPageState: KeysPageState;
}

const KeysPageContent : React.FunctionComponent<Props> = props => {
  //Reducer, set public Key
  //Reducer, set Private Key
  const publicKeyInputRef = React.useRef<HTMLInputElement | null>(null);
  const privateKeyInputRef = React.useRef<HTMLInputElement | null>(null);
  const [publicKeyFingerprint, setPublicKeyFingerprint] = useState("");
  const [privateKeyFingerprint, setPrivateKeyFingerprint] = useState("");
  const [publicKeyFilename, setPublicKeyFilename] = useState("");
  const [privateKeyFilename, setPrivateKeyFilename] = useState("");

  useEffect(() => {
    console.log(props.keysPageState);
    return () => {
      const keyPageState: KeysPageState = {
        publicKeyFingerprint: publicKeyFingerprint,
        privateKeyFingerprint: privateKeyFingerprint,
        publicKeyFilename: publicKeyFilename,
        privateKeyFilename: privateKeyFilename
      }
      props.setKeysPageState(keyPageState);
    };
  }, [publicKeyFingerprint, privateKeyFingerprint, publicKeyFilename, privateKeyFilename]);

  const openPopupClick = function(popupPage: KEYSPOPUPTYPES){
    props.setPopupPage(popupPage);
    props.setPopupVisibility(true);
  }

  async function handleStegDecode(input: StegInput, type: string, filename: string){
    const decodedKey = await decodeSteg(input);
    handleKeyLoader(decodedKey, type, filename);
  }

  async function handleKeyLoader(key: string, type: string, filename: string){
    if(isPublicKey(key) || isPrivateKey(key)){
      const initKey = await openpgpKey.readArmored(key);
      let fingerprintReadableString = '';
      if(initKey?.keys.length){
        //No types exist in the OpenPGP Types package.
        //@ts-expect-error
        const fingerprintBuffer = new Uint8Array(initKey.keys[0].primaryKey.fingerprint);
        const fingerprintString = bufferToHex(fingerprintBuffer);
        fingerprintReadableString = styleFingerprintString(fingerprintString);
      }
      if(type === 'public') {
        props.loadPublicKey(key);
        setPublicKeyFingerprint(fingerprintReadableString);
        setPublicKeyFilename(filename);
      } else if(type === 'private') {
        props.loadPrivateKey(key);
        setPrivateKeyFingerprint(fingerprintReadableString);
        setPrivateKeyFilename(filename);
      }
    } else {
      if(type === 'public') {
        resetPublicKeyInput();
      } else if(type === 'private') {
        resetPrivateKeyInput();
      }
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const fileReference = e.target.files && e.target.files[0];
    if(fileReference){
      const fileReader = new FileReader();
      if(fileReference.type.indexOf('png') !== -1){
        fileReader.onloadend = (e: Event) => fileReader.result && handleStegDecode(fileReader.result, type, fileReference.name);
        fileReader.readAsDataURL(fileReference);
      } else {
        fileReader.onloadend = (e: Event) => fileReader.result && handleKeyLoader(fileReader.result as string, type, fileReference.name);
        fileReader.readAsText(fileReference);
      }
    }
  }

  const resetPublicKeyInput = function(){
    if(publicKeyInputRef !== null && publicKeyInputRef.current) publicKeyInputRef.current.value = "";
    setPublicKeyFilename("");
    setPublicKeyFilename("");
  }

  const resetPrivateKeyInput = function(){
    if(privateKeyInputRef !== null && privateKeyInputRef.current) privateKeyInputRef.current.value = "";
    setPrivateKeyFingerprint("");
    setPrivateKeyFilename("");
  }

  const resetPublicKey = function(){
    props.loadPublicKey('');
    resetPublicKeyInput();
  }

  const resetPrivateKey = function(){
    props.loadPrivateKey('');
    resetPrivateKeyInput();
  }

  return(
    <div className="page-content keys-page">
      Keys Imports
      <form>
        <label>
          <span>Private key {privateKeyFilename ? `- ${privateKeyFilename}` : null}</span>
          <input accept=".asc,.png"
                 type="file"
                 ref={privateKeyInputRef}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleOnChange(e, 'private') }}
          />
          <span>Fingerprint: {privateKeyFingerprint}</span>
        </label>
        <input type="reset"
               defaultValue="Reset"
               onClick={resetPrivateKey}
        />
      </form>
      <form>
        <label>
          <span>Public key {publicKeyFilename ? `- ${publicKeyFilename}` : null}</span>
          <input accept=".asc,.png"
                 type="file"
                 ref={publicKeyInputRef}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleOnChange(e, 'public') }}
          />
          <span>Fingerprint: {publicKeyFingerprint}</span>
        </label>
        <input type="reset"
               defaultValue="Reset"
               onClick={resetPublicKey}
        />
      </form>
      Keys Popups
      <button onClick={() => openPopupClick(KEYSPOPUPTYPES.PASTE)}>Paste keys in</button>
      <button onClick={() => openPopupClick(KEYSPOPUPTYPES.NEWKEYS)}>Generate new keys</button>
      <button onClick={() => openPopupClick(KEYSPOPUPTYPES.CONVERT)}>Convert keys</button>
      <button onClick={() => openPopupClick(KEYSPOPUPTYPES.BROWSE_SEARCH)}>Browse keys</button>
      <button onClick={() => openPopupClick(KEYSPOPUPTYPES.BROWSE_UPLOAD)}>Browse upload</button>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    keysPageState: state.appState.keysPage.main,
    loadedKeys: state.appState.keys
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setKeysPageState: (state: KeysPageState) => dispatch(setKeysPageState(state)),
    loadPublicKey: (publicKey: string) => dispatch(loadPublicKey(publicKey)),
    loadPrivateKey: (privateKey: string) => dispatch(loadPrivateKey(privateKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeysPageContent);
