import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Store } from "redux";
import { Provider } from "react-redux";
import store, { ApplicationState } from "./Store";

interface Props {
  store: Store<ApplicationState>
}

const Root: React.FunctionComponent<Props> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  )
}

ReactDOM.render(<Root store={store} />, document.getElementById('mp-root'));
