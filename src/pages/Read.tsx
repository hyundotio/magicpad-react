import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerRead from "./Popups/PopupContainerRead";

const PageWrite : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <div className="page-content">
        Read
        <button onClick={() => setPopupVisibility(true)}>Open Popup</button>
      </div>
      <Popup
       title={"Read popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerRead />
      </Popup>
    </>
  )
}

export default PageWrite;
