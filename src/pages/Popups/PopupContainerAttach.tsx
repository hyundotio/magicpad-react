import React from "react";

interface Props {
  processedContent: ArrayBuffer | string;
}

const PopupContainerAttach : React.FunctionComponent<Props> = props => {
  return (
    <div className="popup-container attach-popup">
      <div className="popup-content read-process">
        {props.processedContent}
      </div>
    </div>
  )
}

export default PopupContainerAttach;
