import { Reducer } from "redux";
import { Keys, KeysState, KeysActions, KeysActionsTypes } from "../@types/KeysTypes";
import { saveState, loadState } from "../actions/SessionActions";

const InitialKeysState : KeysState = {
  keys: {
    publicKey: '',
    privateKey: ''
  }
}

export const KeysReducer: Reducer <KeysState, KeysActions> =
             (state = InitialKeysState, action) => {
  switch(action.type) {
    case KeysActionsTypes.SAVEKEYS: {
      //const newState = {...state, keys: action};
      //saveState(newState);
      return state
    }
    case KeysActionsTypes.LOADKEYS: {
      //const newState = loadState();
      //console.log(newState);
      return state
    }
    default:
      return state
  }
}
