import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import "./App.css";

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Switch>
          <Route exact path={["/", "/explore"]}>
            <Explore />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
