import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MyAccount from "./pages/MyAccount";
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/Logout";
import GRVTest from "./pages/grvtest.js";
import UserProvider from "../src/context/userContext";
import "./index.css";
import "./App.css";

export default function App() {
  const userData = useContext(UserProvider.context);
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path={["/explore", "/"]}>
            <Explore />
          </Route>
          <Route exact path="/myaccount">
            {/* {!userData.username ? <Redirect to="/" /> : <MyAccount />} */}
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
            <GRVTest />
          </Route>
          <Route exact path="/logout">
            <LogOut />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}
