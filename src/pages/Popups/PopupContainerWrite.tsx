import React, { useEffect } from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { revokeBlob, dataURItoBlobURL } from "../../components/FileOutput/BlobHandler";

interface Props {
  processedContent: string;
  processedStegLink: string;
}

const PopupContainerWrite : React.FunctionComponent<Props> = props => {
  const downloadUrl = dataURItoBlobURL(`data:application/octet-stream;base64;filename=encrypted_message.txt,${btoa(props.processedContent)}`);

  useEffect(() => {
    return () => {
      revokeBlob(downloadUrl);
    };
  }, [downloadUrl]);

  return (
    <div className="popup-container write-popup">
      <div className="popup-content write-process">
        {props.processedContent}
        {props.processedStegLink !== '#' ? <a href={props.processedStegLink} download="steg_output.png">Download steg</a> : null}
        <CopyToClipboard text={props.processedContent}>
          <button>Copy</button>
        </CopyToClipboard>
        <a href={downloadUrl} download="encrypted_message.txt">Download</a>
      </div>
    </div>
  )
}

export default PopupContainerWrite;
