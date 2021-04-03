import React from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";

interface Props {
  processedContent: ProcessedData;
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
