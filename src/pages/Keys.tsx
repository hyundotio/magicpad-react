import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import {TabSwitcher, TabHeader, TabContent} from "../components/Universal/Tabs";

const PageKeys : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <div className="page-content keys-page">
      Keys
    </div>
  )
}

export default PageKeys;
