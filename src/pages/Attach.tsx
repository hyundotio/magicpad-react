import React, { useState } from "react";
import Popup from "../components/Universal/Popup";
import PopupContainerAttach from "./Popups/PopupContainerAttach";
import AttachPageContent from "../components/PageContents/AttachPageContent";

const PageAttach : React.FunctionComponent = () => {
  const [processedContent, setProcessedContent] = useState('#');
  const [filename, setFilename] = useState("");
  const [processed, setProcessed] = useState(false);
  const [popupVisible, setPopupVisibility] = useState(false);

  return (
    <>
      <AttachPageContent
        setPopupVisibility={setPopupVisibility}
        setProcessedContent={setProcessedContent}
        processedContent={processedContent}
        setProcessed={setProcessed}
        processed={processed}
        setFilename={setFilename}
        filename={filename}
      />
      <Popup
       title={"Attach popup"}
       visible={popupVisible}
       closePopup={() => setPopupVisibility(false)}
      >
        <PopupContainerAttach
          processedContent={processedContent}
          processed={processed}
          filename={filename}
        />
      </Popup>
    </>
  )
}

export default PageAttach;
