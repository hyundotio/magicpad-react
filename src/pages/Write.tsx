import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PasswordInput from "../components/Universal/PasswordInput";
import TextareaInput from "../components/Universal/TextareaInput";
import PopupContainerWrite from "./Popups/PopupContainerWrite";

const PageWrite : React.FunctionComponent = () => {
  const [signMessage, setSignMessage] = useState(false);
  const [popupVisible, setPopupVisibility] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  function handleSignOnClick(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setSignMessage(input.checked);
  }

  return (
    <>
      <div className="page-content">
        Write
        Sign message: <input type="checkbox" onClick={handleSignOnClick} />
        {signMessage ? <PasswordInput setPasswordValue={setPasswordValue} /> : null}
        <TextareaInput setTextareaValue={setTextareaValue} />
        <button disabled={
          signMessage ?
          passwordValue.length === 0 || textareaValue.length === 0 :
          textareaValue.length === 0
        }>Encrypt</button>
        <button disabled={true} onClick={() => setPopupVisibility(true)}>Open encrypted content</button>
      </div>
      <Popup
       title={"Write popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerWrite />
      </Popup>
    </>
  )
}

export default PageWrite;
