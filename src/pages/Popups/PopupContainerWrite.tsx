import React from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";

interface Props {
  processedContent: ProcessedData;
  processedStegLink: string;
}

const PopupContainerWrite : React.FunctionComponent<Props> = props => {
  return (
    <div className="popup-container write-popup">
      <div className="popup-content write-process">
        {props.processedContent}
        {props.processedStegLink !== '#' ? <a href={props.processedStegLink} download="steg_output.png">Download steg</a> : null}
      </div>
    </div>
  )
}

export default PopupContainerWrite;
