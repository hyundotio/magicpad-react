import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../Store";

import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';

import { KEYSPOPUPTYPES } from "../../@types/KeysPopupTypes";
import { Keys } from "../../@types/KeysTypes";
import { loadPublicKey, loadPrivateKey } from "../../actions/SessionActions";

import { isPublicKey, isPrivateKey } from "../Cryptography/VerifyKeys";

import { encodeSteg, decodeSteg } from "../Steganography/Steg";
import { StegInput } from "../../@types/StegTypes";

interface Props {
  loadPublicKey: typeof loadPublicKey;
  loadPrivateKey: typeof loadPrivateKey;
  setPopupPage: Function;
  setPopupVisibility: Function;
  loadedKeys: Keys;
}

const KeysPageContent : React.FunctionComponent<Props> = props => {
  //Reducer, set public Key
  //Reducer, set Private Key
  const publicKeyInputRef = React.useRef<HTMLInputElement | null>(null);
  const privateKeyInputRef = React.useRef<HTMLInputElement | null>(null);

  const openPopupClick = function(popupPage: KEYSPOPUPTYPES){
    props.setPopupPage(popupPage);
    props.setPopupVisibility(true);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        if(e.target?.result!){
          const key = e.target?.result! as string;
          if(type === 'public'){
            if(isPublicKey(key)){
              props.loadPublicKey(key);
            } else {
              resetPublicKeyInput();
            }
          }
          if(type === 'private'){
            if(isPrivateKey(key)){
              props.loadPrivateKey(key);
            } else {
              resetPrivateKeyInput();
            }
          }
        }
      }
      fileReader.readAsText(file);
    }
  }

  const resetPublicKeyInput = function(){
    if(publicKeyInputRef !== null && publicKeyInputRef.current) publicKeyInputRef.current.value = "";
  }

  const resetPrivateKeyInput = function(){
    if(privateKeyInputRef !== null && privateKeyInputRef.current) privateKeyInputRef.current.value = "";
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
        <input accept=".asc,.png"
               type="file"
               ref={publicKeyInputRef}
               onChange={(e) => {handleOnChange(e,'public')}}
        />
        <input type="reset"
               defaultValue="Reset"
               onClick={resetPublicKey}
        />
      </form>
      <form>
        <input accept=".asc,.png"
               type="file"
               ref={privateKeyInputRef}
               onChange={(e) => {handleOnChange(e,'private')}}
        />
        <input type="reset"
               defaultValue="Reset"
               onClick={resetPrivateKey}
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
    loadedKeys: state.userKeys.keys
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadPublicKey: (publicKey: string) => dispatch(loadPublicKey(publicKey)),
    loadPrivateKey: (privateKey: string) => dispatch(loadPrivateKey(privateKey))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(KeysPageContent);
