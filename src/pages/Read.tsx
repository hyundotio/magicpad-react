import React, {useState} from "react";
import Popup from "../components/Universal/Popup";

interface Props {
}

const PageWrite : React.FunctionComponent<Props> = (props: Props) => {
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <div className="page-content">
    </div>
  )
}

export default PageWrite;
