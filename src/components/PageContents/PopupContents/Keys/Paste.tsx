import React, { useState, useEffect } from "react";
import { isPublicKey, isPrivateKey } from "../../../Cryptography/Verify";
import { loadPublicKey, loadPrivateKey } from "../../../../actions/SessionActions";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { KeysPagePasteState } from "../../../../@types/StateTypes";
import { ApplicationState } from "../../../../Store";
import { setKeysPagePasteState } from "../../../../actions/SessionActions";

interface Props {
  loadPublicKey: typeof loadPublicKey;
  loadPrivateKey: typeof loadPrivateKey;
  keysPagePasteState: KeysPagePasteState;
  setKeysPagePasteState: typeof setKeysPagePasteState;
}

const PopupContentsKeysPaste : React.FunctionComponent<Props> = props => {
  //Reducer, set public Key (owner);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    return () => {
      const keysPagePasteState: KeysPagePasteState = {
        textareaValue: textareaValue
      }
      props.setKeysPagePasteState(keysPagePasteState);
    };
  }, [textareaValue]);

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
      setTextareaValue("");
    }
  }

  return (
    <div className="popup-content keys-paste">
      Keys paste
      <textarea onChange={handleOnChange} value={textareaValue} placeholder="Paste in public or private key for import."></textarea>
      <button disabled={textareaValue.length <= 0} onClick={handleImport} >Import</button>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    keysPagePasteState: state.appState.keysPage.paste
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setKeysPagePasteState: (state: KeysPagePasteState) => dispatch(setKeysPagePasteState(state)),
    loadPublicKey: (publicKey: string) => dispatch(loadPublicKey(publicKey)),
    loadPrivateKey: (privateKey: string) => dispatch(loadPrivateKey(privateKey))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupContentsKeysPaste);
