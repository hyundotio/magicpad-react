import React from "react";
import {ProcessedData} from "../../@types/ProcessedDataTypes";

interface Props {
  processedContent: ProcessedData;
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
