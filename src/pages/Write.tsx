import React, {useState} from "react";
import Popup from "../components/Universal/Popup";

interface Props {
}

const PageWrite : React.FunctionComponent<Props> = (props: Props) => {
  const [signMessage, setSignMessage] = useState('');
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <div className="page-content">
        Write
        <input type="checkbox" />
        <button onClick={() => setPopupVisibility(true)}>Open Popup</button>
      </div>
      <Popup
        closePopup={() => setPopupVisibility(false)}
        visible={popupVisible}
        title="Popup for write header"
      >
        Popup for Write Content
      </Popup>
    </>
  )
}

export default PageWrite;
