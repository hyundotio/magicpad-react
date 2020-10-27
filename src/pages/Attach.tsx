import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerAttach from "./Popups/PopupContainerAttach";

const PageAttach : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  
  return (
    <>
      <div className="page-content attach-page">
        Attach
        <button onClick={() => setPopupVisibility(true)}>Open Popup</button>
      </div>
      <Popup
       title={"Attach popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerAttach />
      </Popup>
    </>
  )
}

export default PageAttach;
