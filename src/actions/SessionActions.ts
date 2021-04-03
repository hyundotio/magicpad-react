import { LoadPublicKey, LoadPrivateKey, Keys, KeysActionsTypes } from "../@types/KeysTypes";
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
  (publicKey: string) => ({type: KeysActionsTypes.LOADPUBLICKEY, publicKey: publicKey})

export const loadPrivateKey: ActionCreator<LoadPrivateKey> =
  (privateKey: string) => ({type: KeysActionsTypes.LOADPRIVATEKEY, privateKey: privateKey})
