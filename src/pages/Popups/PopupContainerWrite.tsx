import React from "react";

interface Props {
  processedContent: ArrayBuffer | string;
}

const PopupContainerWrite : React.FunctionComponent<Props> = props => {
  return (
    <div className="popup-container write-popup">
      <div className="popup-content write-process">
        {props.processedContent}
      </div>
    </div>
  )
}

export default PopupContainerWrite;
