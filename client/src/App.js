import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import MyAccount from "./pages/MyAccount";
import Home from './pages/home'
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import GRVTest from "./pages/grvtest.js";
import "./index.css";
import "./App.css";
import API from "./utils/API";

const client = require("filestack-js").init(
  `AH2nffwSZT3PqqE34NAj8z` || process.env.REACT_APP_FILESTACK_KEYZZZZZ
);
require(`dotenv`).config();

export default function App() {
  const [state, setState] = useState({
    loggedIn: false
  })
  function updateLogIn(status) {
    setState({loggedIn: status})
  }
  
  return (
    <Router>
      <Container>
           <Switch>
        <Route exact path={"/"}>
            <Home {...state} stateChanger={updateLogIn} />
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
            <LogIn {...state} stateChanger={updateLogIn}  />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/grv">
            <GRVTest client={client} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
