import React from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";

interface Props {
  processedContent: string;
  processed: boolean;
  filename: string;
}

const PopupContainerAttach : React.FunctionComponent<Props> = props => {
  return (
    <div className="popup-container attach-popup">
      <div className="popup-content read-process">
        {props.processed ? <a href={props.processedContent} download={props.filename}>Download processed content</a> : null}
      </div>
    </div>
  )
}

export default PopupContainerAttach;
