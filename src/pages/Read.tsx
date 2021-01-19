import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PasswordInput from "../components/Universal/PasswordInput";
import TextareaInput from "../components/Universal/TextareaInput";
import PopupContainerRead from "./Popups/PopupContainerRead";

const PageWrite : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <>
      <div className="page-content">
        Read
        <PasswordInput setPasswordValue={setPasswordValue} />
        <TextareaInput setTextareaValue={setTextareaValue} />
        <button disabled={passwordValue.length === 0 || textareaValue.length === 0}>Decrypt</button>
        <button disabled={true} onClick={() => setPopupVisibility(true)}>Open decrypted content</button>
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
