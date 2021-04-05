import React, { useState } from "react";
import { isPublicKey, isPrivateKey } from "../../../Cryptography/VerifyKeys";
import { loadPublicKey, loadPrivateKey } from "../../../../actions/SessionActions";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface Props {
  loadPublicKey: typeof loadPublicKey;
  loadPrivateKey: typeof loadPrivateKey;
}

const PopupContentsKeysPaste : React.FunctionComponent<Props> = props => {
  //Reducer, set public Key (owner);
  const [textareaValue, setTextareaValue] = useState("");
  function handleOnChange(e: React.FormEvent<HTMLTextAreaElement>) {
    const input = e.target as HTMLTextAreaElement;
    setTextareaValue(input.value);
  }
  function handleImport(){
    if(isPublicKey(textareaValue)){
      props.loadPublicKey(textareaValue);
    } else if (isPrivateKey(textareaValue)) {
      props.loadPrivateKey(textareaValue);
    } else {
      //error message. reset?
    }
  }

  return (
    <div className="popup-content keys-paste">
      Keys paste
      <textarea onChange={handleOnChange} placeholder="Paste in public or private key for import."></textarea>
      <button disabled={textareaValue.length <= 0} onClick={handleImport} >Import</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadPublicKey: (publicKey: string) => dispatch(loadPublicKey(publicKey)),
    loadPrivateKey: (privateKey: string) => dispatch(loadPrivateKey(privateKey))
  }
};

export default connect(null, mapDispatchToProps)(PopupContentsKeysPaste);
