import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PasswordInput from "../components/Universal/PasswordInput";
import TextareaInput from "../components/Universal/TextareaInput";
import WritePageContent from "../components/PageContents/WritePageContent";
import PopupContainerWrite from "./Popups/PopupContainerWrite";

const PageWrite : React.FunctionComponent = () => {
  const [processedContent, setProcessedContent] = useState('');
  const [popupVisible, setPopupVisibility] = useState(false);
  
  return (
    <>
      <div className="page-content">
        <WritePageContent
          setPopupVisibility={setPopupVisibility}
          setProcessedContent={setProcessedContent}
        />
      </div>
      <Popup
       title={"Write popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerWrite processedContent={processedContent} />
      </Popup>
    </>
  )
}

export default PageWrite;
