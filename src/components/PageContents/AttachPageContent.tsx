import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ProcessedData } from "../../@types/ProcessedDataTypes";
import { Keys } from "../../@types/KeysTypes";
import PasswordInput from "../Universal/PasswordInput";
import WebWorker from '../../webworker';
import { ApplicationState } from "../../Store";
import { revokeBlob, dataURItoBlobURL } from "../FileOutput/BlobHandler";
import { getFilename } from "../Universal/Helpers/GetFilename";
import { isPublicKey, isPrivateKey } from "../Cryptography/Verify";

interface Props {
  setPopupVisibility: Function;
  setProcessedContent: Function;
  setProcessed: Function;
  processedContent: string;
  processed: boolean;
  loadedKeys: Keys;
  setFilename: Function;
  filename: string;
}

const AttachPageContent : React.FunctionComponent<Props> = props => {
  const [passwordValue, setPasswordValue] = useState("");
  const [attachType, setAttachType] = useState("");
  const [fileReference, setFileReference] = useState<File | undefined>(undefined);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    return () => {
      //If isWorking, handle specially.
      const keyConvertState = {
        attachType: attachType,
        downloadUrl: downloadUrl
      }
    };
  }, []);

  const handleAttachTypeOnClick = function(e: React.FormEvent<HTMLInputElement>){
    const input = e.target as HTMLInputElement;
    setAttachType(input.value);
  }

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files !== null && input.files[0];
    file && setFileReference(file);
  }

  async function processDataAsync(data: ProcessedData, filename: string){
    setIsWorking(true);
    const pgpWebWorker = new WebWorker();
    if(attachType === 'encrypt'){
      const processedData = await pgpWebWorker.encryptAttachment(data, passwordValue, props.loadedKeys.publicKey);
      const processedDataUrl = dataURItoBlobURL(`data:application/octet-stream;base64;filename=encrypted_${filename}.asc,${btoa(processedData)}`);
      props.setFilename(`encrypted_${filename}.asc`);
      setDownloadUrl(processedDataUrl);
      props.setProcessedContent(processedDataUrl);
    } else if (attachType === 'decrypt') {
      props.processedContent.indexOf('blob:') === 0 && revokeBlob(props.processedContent);
      const processedData = await pgpWebWorker.decryptAttachment(data, passwordValue, props.loadedKeys.privateKey);
      const processedDataBlob = new Blob([processedData], {
				type: 'application/octet-stream'
			});
      const processedDataBlobUrl = window.URL.createObjectURL(processedDataBlob);
      props.setFilename(`decrypted_${filename}`);
      setDownloadUrl(processedDataBlobUrl);
      props.setProcessedContent(processedDataBlobUrl);
    } else {
      return
    }
    setIsWorking(false);
    props.setProcessed(true);
    props.setPopupVisibility(true);
  }

 const handleProcess = function() {
    if(fileReference){
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => e?.target!.result && processDataAsync(e.target.result, fileReference.name);
      if(attachType === 'encrypt'){
        fileReader.readAsArrayBuffer(fileReference);
      } else if (attachType === 'decrypt') {
        fileReader.readAsText(fileReference);
      }
    }
  }

  return (
    <div className="page-content attach-page">
      Attach
      <form>
        Encrypt <input name="attach_type" type="radio" value="encrypt" onClick={handleAttachTypeOnClick} />
        Decrypt <input name="attach_type" type="radio" value="decrypt" onClick={handleAttachTypeOnClick} />
        {attachType === "decrypt" ? <PasswordInput passwordValue={passwordValue} setPasswordValue={setPasswordValue} /> : null}
        {attachType !== "" ? <input type="file"
                               onChange={handleFileOnChange}
                               disabled={attachType === ""}
                             /> :
         null
        }
      </form>
      {
        attachType ?
        <div className="attach-options">
          <button
            disabled={
              attachType === "decrypt" ?
              (fileReference === undefined || passwordValue.length === 0 || isWorking) :
              (fileReference === undefined || isWorking)
            }
            onClick={handleProcess}
          >Process attachment</button>
          <button disabled={!props.processed || isWorking} onClick={() => props.setPopupVisibility(true)}>Open processed attachment</button>
        </div> :
        <div className="attach-init">Choose processing type above.</div>
      }
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    loadedKeys: state.userKeys.keys
  }
}

export default connect(mapStateToProps)(AttachPageContent);
