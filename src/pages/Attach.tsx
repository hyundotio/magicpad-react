import React, {useState} from "react";
import Popup from "../components/Universal/Popup";

const PageAttach : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const handlePopup = function(bool: boolean) {
    setPopupVisibility(true);
  }
  
  return (
    <div className="page-content attach-page">
      Attach
      <button onClick={() => handlePopup}>Open Popup</button>
    </div>
  )
}

export default PageAttach;
