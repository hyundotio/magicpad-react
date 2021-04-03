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

  const openPopupClick = function(popupPage: KEYSPOPUPTYPES){
    props.setPopupPage(popupPage);
    props.setPopupVisibility(true);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if(type === 'public') isPublicKey('key') && props.loadPublicKey('public key loaded!');
    if(type === 'private') isPrivateKey('key') && props.loadPrivateKey('public key loaded!');
  }

  return(
    <div className="page-content keys-page">
      Keys Imports
      <form>
        <input accept=".asc,.png"
               type="file"
               onChange={(e) => {handleOnChange(e,'public')}}
        />
        <input type="reset" defaultValue="Reset" />
      </form>
      <form>
        <input accept=".asc,.png"
               type="file"
               onChange={(e) => {handleOnChange(e,'private')}}
        />
        <input type="reset" defaultValue="Reset" />
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
