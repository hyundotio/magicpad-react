import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { KeysState } from "./@types/KeysTypes";
import { KeysReducer } from "./reducers/KeysReducer";


export interface ApplicationState {
  userKeys: KeysState
}

const rootReducer = combineReducers<ApplicationState>({
  userKeys: KeysReducer
})

export function configureStore(): Store<ApplicationState> {
  const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
  return store
}

export const store = configureStore();
export default store;
