import React, { useState, useEffect } from "react";
import { HKP as openpgpHKP, key as openpgpKey } from "openpgp";
import { bufferToHex, styleFingerprintString } from "../../../Universal/Helpers/PGPFingerprintParser";
import { KeySearchResult } from "../../../../@types/KeysTypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loadPublicKey } from "../../../../actions/SessionActions";
import { KEY_SERVER, KEY_SERVER_PROTOCOL, KEY_SERVER_DOWNLOAD_URL } from "../../../Universal/KeyServer";

interface Props {
  loadPublicKey: typeof loadPublicKey;
}

const PopupContentsKeysBrowseSearch : React.FunctionComponent<Props> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const hkpInstance = new openpgpHKP(`${KEY_SERVER_PROTOCOL}${KEY_SERVER}`);
  const [searchResults, setSearchResults] = useState<KeySearchResult[] | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  async function searchServer(){
    setIsWorking(true);
    const hkpLookup = await hkpInstance.lookup({query: inputValue});
    let results: KeySearchResult[] = [];
    if(hkpLookup){
      const hkpResult = await openpgpKey.readArmored(hkpLookup);
      if(hkpResult.keys.length){
        hkpResult.keys.forEach(key => {
          //@ts-ignore
          const fingerprintBuffer = new Uint8Array(key.keyPacket.fingerprint);
          const fingerprintString = bufferToHex(fingerprintBuffer);
          //@ts-ignore
          const userIdDetails = key.users[0].userId;
          results.push({
            name: userIdDetails.name,
            email: userIdDetails.email,
            fingerprint: fingerprintString,
            downloadLink: `${KEY_SERVER_PROTOCOL}${KEY_SERVER}${KEY_SERVER_DOWNLOAD_URL}${fingerprintString}`
          })
        })
        setSearchResults(results);
        setIsWorking(false);
      }
    }
  }

  async function handleDirectImport(url: string, fingerprint: string){
    fetch(url)
    .then(res => res.text())
    .then(
      (result) => {
        props.loadPublicKey({publicKey: result, publicKeyFingerprint: fingerprint});
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function handleKey(publicKey: string){

  }

  return (
    <div className="popup-content keys-browse-search">
      Browse search
      <input type="text" placeholder="Name, Email, or Fingerprint" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
      <button onClick={searchServer} disabled={isWorking}>Search</button>
      {searchResults?.length ?
        <ul>
          {
            searchResults.map((result: KeySearchResult) => {
              return (<li key={result.fingerprint}>
                        <div>Name: {result.name}</div>
                        <div>Email: {result.email}</div>
                        <div>Fingerprint: {styleFingerprintString(result.fingerprint)}</div>
                        <div><a href={result.downloadLink}>Download</a></div>
                        <div><button onClick={() => handleDirectImport(result.downloadLink, result.fingerprint)}>Import</button></div>
                      </li>
                     )
            })
          }
        </ul> : <div key={"no-results"}>No results</div>}
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadPublicKey: (publicKey: string) => dispatch(loadPublicKey(publicKey)),
  }
}

export default connect(null, mapDispatchToProps)(PopupContentsKeysBrowseSearch);
