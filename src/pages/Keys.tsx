import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import {TabSwitcher, TabHeader, TabContent} from "../components/Universal/Tabs";

const PageKeys : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const handlePopup = function(bool: boolean) {
    setPopupVisibility(true);
  }

  return (
    <div className="page-content keys-page">
      Keys
      <button onClick={() => handlePopup}>Open Popup</button>
    </div>
  )
}

export default PageKeys;
