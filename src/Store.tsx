import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { MainReducer } from "./reducers/MainReducer";
import { MainState } from "./@types/StateTypes";


export interface ApplicationState {
  appState: MainState
}

const rootReducer = combineReducers<ApplicationState>({
  appState: MainReducer
})

export function configureStore(): Store<ApplicationState> {
  const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));
  return store
}

export const store = configureStore();
export default store;
