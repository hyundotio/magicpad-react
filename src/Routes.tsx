import * as React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Universal/Header";
import PageAbout from "./pages/About";
import PageAttach from "./pages/Attach";
import PageGuide from "./pages/Guide";
import PageKeys from "./pages/Keys";
import PageRead from "./pages/Read";
import PageWrite from "./pages/Write";

interface Props {
}

class Routes extends React.Component<Props> {
  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          <Redirect exact={true} from="/" to="/keys"/>
          <Route path="/keys" component={PageKeys} />
          <Route path="/write" component={PageWrite} />
          <Route path="/read" component={PageRead} />
          <Route path="/attach" component={PageAttach} />
          <Route path="/guide" component={PageGuide} />
          <Route path="/about" component={PageAbout} />
        </Switch>
      </Router>
    )
  }
}

export default Routes;
