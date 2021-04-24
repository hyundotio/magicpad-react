import { LoadPublicKey,
         LoadPrivateKey,
         SetAttachPageState,
         SetWritePageState,
         SetKeysPageState,
         SetReadPageState,
         ReadPageState,
         AttachPageState,
         WritePageState,
         KeysPageState,
         MainState,
         MainStateActionsTypes } from "../@types/StateTypes";
import { ActionCreator } from "redux";

/*export const loadState: ActionCreator<LoadKeys> =
  () => {
    const cookieContents = {
      publicKey: 'LOADED PUB KEY',
      privateKey: 'LOADED PRIV KEY'
    }
    return ({type: KeysActionsTypes.LOADKEYS, keys: {...cookieContents}})
  }*/

export const loadPublicKey: ActionCreator<LoadPublicKey> =
  (publicKey: string) => ({type: MainStateActionsTypes.LOADPUBLICKEY, publicKey: publicKey});

export const loadPrivateKey: ActionCreator<LoadPrivateKey> =
  (privateKey: string) => ({type:  MainStateActionsTypes.LOADPRIVATEKEY, privateKey: privateKey});

export const setAttachPageState: ActionCreator<SetAttachPageState> =
  (state: AttachPageState) => ({type: MainStateActionsTypes.SETATTACHPAGESTATE, state: state});

export const setWritePageState: ActionCreator<SetWritePageState> =
  (state: WritePageState) => ({type: MainStateActionsTypes.SETWRITEPAGESTATE, state: state});

export const setKeysPageState: ActionCreator<SetKeysPageState> =
  (state: KeysPageState) => ({type: MainStateActionsTypes.SETKEYSPAGESTATE, state: state});

export const setReadPageState: ActionCreator<SetReadPageState> =
  (state: ReadPageState) => ({type: MainStateActionsTypes.SETREADPAGESTATE, state: state});
