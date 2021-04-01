import React, {useState} from "react";
import Popup from "../components/Universal/Popup";
import PasswordInput from "../components/Universal/PasswordInput";
import TextareaInput from "../components/Universal/TextareaInput";
import ReadPageContent from "../components/PageContents/ReadPageContent";
import PopupContainerRead from "./Popups/PopupContainerRead";

const PageWrite : React.FunctionComponent = () => {
  const [processedContent, setProcessedContent] = useState('');
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <ReadPageContent
        setPopupVisibility={setPopupVisibility}
        setProcessedContent={setProcessedContent}
      />
      <Popup
       title={"Read popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerRead processedContent={processedContent} />
      </Popup>
    </>
  )
}

export default PageWrite;
