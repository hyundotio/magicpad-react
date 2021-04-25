import React, { useEffect } from "react";
import { ProcessedData } from "../../@types/ProcessedDataTypes";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { revokeBlob, dataURItoBlobURL } from "../../components/FileOutput/BlobHandler";

interface Props {
  processedContent: string;
}

const PopupContainerRead : React.FunctionComponent<Props> = props => {
  const downloadUrl = dataURItoBlobURL(`data:application/octet-stream;base64;filename=decrypted_message.txt,${btoa(props.processedContent)}`);

  useEffect(() => {
    return () => {
      revokeBlob(downloadUrl);
    };
  }, [downloadUrl]);

  return (
    <div className="popup-container read-popup">
      <div className="popup-content read-process">
        {props.processedContent}
        <CopyToClipboard text={props.processedContent}>
          <button>Copy</button>
        </CopyToClipboard>
        <a href={downloadUrl} download="decrypted_message.txt">Download</a>
      </div>
    </div>
  )
}

export default PopupContainerRead;
