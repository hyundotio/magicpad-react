import { Reducer } from "redux";
import { Keys, KeysState, KeysActions, KeysActionsTypes } from "../@types/KeysTypes";
import { loadPrivateKey, loadPublicKey } from "../actions/SessionActions";

const InitialKeysState : KeysState = {
  keys: {
    publicKey: '',
    privateKey: '',
    publicFingerprint: '',
    privateFingerprint: ''
  }
}

export const KeysReducer: Reducer <KeysState, KeysActions> =
             (state = InitialKeysState, action) => {
  switch(action.type) {
    case KeysActionsTypes.LOADPUBLICKEY: {
      let newState = {...state};
      newState.keys.publicKey = action.publicKey;
      return newState
    }
    case KeysActionsTypes.LOADPRIVATEKEY: {
      let newState = {...state};
      newState.keys.privateKey = action.privateKey;
      return newState;
    }
    default:
      return state
  }
}
