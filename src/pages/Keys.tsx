import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerKeys from "./Popups/PopupContainerKeys";

const PageKeys : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <div className="page-content keys-page">
        Keys
        <button onClick={() => setPopupVisibility(true)}>Open Popup</button>
      </div>
      <Popup
       title={"Keys popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerKeys />
      </Popup>
    </>
  )
}

export default PageKeys;
