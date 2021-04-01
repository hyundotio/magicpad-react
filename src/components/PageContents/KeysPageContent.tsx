import React, {useState} from "react";
import PasswordInput from "../Universal/PasswordInput";
import TextareaInput from "../Universal/TextareaInput";
import WebWorker from '../../webworker';
import {KEYSPOPUPTYPES} from "../../@types/KeysPopupTypes";

interface Props {
  setPopupPage: Function;
  setPopupVisibility: Function;
}

const KeysPageContent : React.FunctionComponent<Props> = props => {

  function openPopupClick(popupPage: KEYSPOPUPTYPES){
    props.setPopupPage(popupPage);
    props.setPopupVisibility(true);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    console.log(file);
  }

  return(
    <div className="page-content keys-page">
      Keys Imports
      <form>
        <input accept=".asc,.png"
               type="file"
               onChange={handleOnChange}
        />
        <input type="reset" defaultValue="Reset" />
      </form>
      <form>
        <input accept=".asc,.png"
               type="file"
               onChange={handleOnChange}
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

export default KeysPageContent
