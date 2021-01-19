import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerAttach from "./Popups/PopupContainerAttach";
import PasswordInput from "../components/Universal/PasswordInput";

const PageAttach : React.FunctionComponent = () => {
  const [popupVisible, setPopupVisibility] = useState(false);
  const [attachType, setAttachType] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  function handleOnClick(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setAttachType(input.value);
  }

  return (
    <>
      <div className="page-content attach-page">
        Attach
        <form>
          Encrypt <input name="attach_type" type="radio" value="encrypt" onClick={handleOnClick} />
          Decrypt <input name="attach_type" type="radio" value="decrypt" onClick={handleOnClick} />
          {attachType === "decrypt" ? <PasswordInput setPasswordValue={setPasswordValue} /> : null}
        </form>
        {
          attachType.length ?
          <div className="attach-options">
            <button disabled={
              attachType === "decrypt" ?
              passwordValue.length === 0 :
              false
            }>Process attachment</button>
            <button onClick={() => setPopupVisibility(true)}>Open processed attachment</button>
          </div> :
          <div className="attach-init">Choose processing type above.</div>
        }
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
