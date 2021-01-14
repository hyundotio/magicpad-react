import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerWrite from "./Popups/PopupContainerWrite";

const PageWrite : React.FunctionComponent = () => {
  const [signMessage, setSignMessage] = useState('');
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <div className="page-content">
        Write
        <input type="checkbox" />
        <button onClick={() => setPopupVisibility(true)}>Open encrypted content</button>
      </div>
      <Popup
       title={"Write popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerWrite />
      </Popup>
    </>
  )
}

export default PageWrite;
