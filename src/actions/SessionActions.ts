import { SaveKeys, LoadKeys, Keys, KeysActionsTypes } from "../@types/KeysTypes";
import { ActionCreator } from "redux";

export const loadState: ActionCreator<LoadKeys> =
  () => {
    const cookieContents = {
      publicKey: 'LOADED PUB KEY',
      privateKey: 'LOADED PRIV KEY'
    }
    return ({type: KeysActionsTypes.LOADKEYS, keys: {...cookieContents}})
  }

export const saveState: ActionCreator<SaveKeys> =
  (keys: Keys) => ({type: KeysActionsTypes.SAVEKEYS, keys: keys})
