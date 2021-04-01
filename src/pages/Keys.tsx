import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerKeys from "./Popups/PopupContainerKeys";
import KeysPageContent from "../components/PageContents/KeysPageContent";
import {KEYSPOPUPTYPES} from "../@types/KeysPopupTypes";

const PageKeys : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const [popupPage, setPopupPage] = useState(KEYSPOPUPTYPES.CONVERT);

  return (
    <>
      <KeysPageContent
        setPopupVisibility={setPopupVisibility}
        setPopupPage={setPopupPage}
      />
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
