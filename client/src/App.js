import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
  `AH2nffwSZT3PqqE34NAj8z` || process.env.REACT_APP_FILESTACK_KEYZZZZZ
);
require(`dotenv`).config();

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{ float: "left" }}>
          <Menu vertical>
            <Menu.Item as={Link} to="/" name="Home" />
            <Menu.Item as={Link} to="/explore" name="Explore" />
            <Menu.Item as={Link} to="/myaccount" name="My Account" />
            <Menu.Item as={Link} to="/grv" name="GRV Test Playground" />
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path={["/explore", "/"]}>
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
