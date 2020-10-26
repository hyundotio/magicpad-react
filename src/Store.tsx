import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { KeysState } from "./@types/KeysTypes";
import { KeysReducer } from "./reducers/KeysReducer";


export interface ApplicationState {
  keys: KeysState
}

const rootReducer = combineReducers<ApplicationState>({
  keys: KeysReducer
})

export default function configureStore(): Store<ApplicationState> {
  const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
  return store
}
