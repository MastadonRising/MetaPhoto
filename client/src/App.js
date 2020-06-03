import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Menu } from "semantic-ui-react";
import MyAccount from "./pages/MyAccount";
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import GRVTest from "./pages/grvtest.js";
import "./index.css";
import "./App.css";

const client = require("filestack-js").init(
  process.env.REACT_APP_FILESTACK_KEY
);
require(`dotenv`).config();

export default function App() {
  const [state, setState] = useState({
    loggedIn: false,
  });

  function updateLogIn(status) {
    setState({ loggedIn: status });
  }

  return (
    <Router>
      <div>
        <nav style={{ float: "left" }}>
          <Menu vertical>
            <Menu.Item
              as={Link}
              onClick={
                state.loggedIn ? () => setState({ loggedIn: false }) : null
              }
              to="/"
              name={state.loggedIn ? "Log Out" : "Home"}
            />
            <Menu.Item as={Link} to="/explore" name="Explore" />
            <Menu.Item as={Link} to="/myaccount" name="My Account" />
            <Menu.Item as={Link} to="/resources" name="Resources" />
            <Menu.Item as={Link} to="/upload" name="Upload" />
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path={"/"}>
            {!state.loggedIn ? (
              <LogIn state={state} logginer={updateLogIn} />
            ) : (
              <Redirect to="/myaccount" />
            )}
          </Route>
          <Route exact path={"/explore"}>
            <Explore />
          </Route>
          <Route exact path="/myaccount">
            <MyAccount />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/grv">
            <GRVTest />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/grv">
            <GRVTest client={client} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
