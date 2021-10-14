import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import List from "./pages/list";
import Selector from "./pages/selector";

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/list" component={List} />
            <Route exact path="/selector" component={Selector} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
