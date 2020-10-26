import React, {useState} from "react";
import Popup from "../components/Universal/Popup";

const PageAttach : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <div className="page-content attach-page">
      Attach
    </div>
  )
}

export default PageAttach;
