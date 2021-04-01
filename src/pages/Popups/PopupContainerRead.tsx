import React from "react";

interface Props {
  processedContent: ArrayBuffer | string;
}

const PopupContainerRead : React.FunctionComponent<Props> = props => {
  return (
    <div className="popup-container read-popup">
      <div className="popup-content read-process">
        {props.processedContent}
      </div>
    </div>
  )
}

export default PopupContainerRead;
