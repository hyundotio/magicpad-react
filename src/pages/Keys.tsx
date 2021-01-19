import React, {useState} from "react";
import {KEYSPOPUPTYPES} from "../@types/KeysPopupTypes";
import Popup from "../components/Universal/Popup";
import PopupContainerKeys from "./Popups/PopupContainerKeys";

const PageKeys : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const [popupPage, setPopupPage] = useState(KEYSPOPUPTYPES.CONVERT);
  const privKeyInputRef = React.useRef(null);
  const pubKeyInputRef = React.useRef(null);

  function openPopupClick(popupPage: KEYSPOPUPTYPES){
    setPopupPage(popupPage);
    setPopupVisibility(true);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files[0];
    console.log(file);
  }

  return (
    <>
      <div className="page-content keys-page">
        Keys Imports
        <form>
          <input accept=".asc,.png"
                 type="file"
                 onChange={handleOnChange}
                 ref={pubKeyInputRef}
          />
          <input type="reset" defaultValue="Reset" />
        </form>
        <form>
          <input accept=".asc,.png"
                 type="file"
                 onChange={handleOnChange}
                 ref={privKeyInputRef}
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
      <Popup
       title={"Keys popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerKeys popupPage={popupPage} />
      </Popup>
    </>
  )
}

export default PageKeys;
