import React, { useState } from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerAttach from "./Popups/PopupContainerAttach";
import AttachPageContent from "../components/PageContents/AttachPageContent";

const PageAttach : React.FunctionComponent = () => {
  const [processedContent, setProcessedContent] = useState('');
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <AttachPageContent
        setPopupVisibility={setPopupVisibility}
        setProcessedContent={setProcessedContent}
      />
      <Popup
       title={"Attach popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerAttach processedContent={processedContent}/>
      </Popup>
    </>
  )
}

export default PageAttach;
