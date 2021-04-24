import { LoadPublicKey,
         LoadPrivateKey,
         SetAttachPageState,
         AttachPageState,
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
  (publicKey: string) => ({type: MainStateActionsTypes.LOADPUBLICKEY, publicKey: publicKey})

export const loadPrivateKey: ActionCreator<LoadPrivateKey> =
  (privateKey: string) => ({type:  MainStateActionsTypes.LOADPRIVATEKEY, privateKey: privateKey})

export const setAttachPageState: ActionCreator<SetAttachPageState> =
  (state: AttachPageState) => ({type: MainStateActionsTypes.SETATTACHPAGESTATE, state: state})
