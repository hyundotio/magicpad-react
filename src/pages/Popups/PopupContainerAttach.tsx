import React from "react";
import {ProcessedData} from "../../@types/ProcessedDataTypes";

interface Props {
  processedContent: ProcessedData;
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
