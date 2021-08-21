import React, { Component, Fragment } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { SignIn, SignUp } from "../src/components";
import { History } from "./utils";

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Router history={History}>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default Routes;
