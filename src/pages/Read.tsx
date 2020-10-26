import React, {useState} from "react";
import Popup from "../components/Universal/Popup";

interface Props {
}

const PageWrite : React.FunctionComponent<Props> = (props: Props) => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const handlePopup = function(bool: boolean) {
    setPopupVisibility(true);
  }

  return (
    <div className="page-content">
      Read
      <button onClick={() => handlePopup}>Open Popup</button>
    </div>
  )
}

export default PageWrite;
