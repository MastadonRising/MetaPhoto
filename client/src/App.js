import React, { useState, useEffect } from "react";
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
import Settings from "./pages/Settings.js";
import LogOut from "./pages/Logout";
import NotFound from "./pages/404";
import UserContext from "../src/context/userContext";
import "./index.css";
import "./App.css";

export default function App() {
  const [user, setUser] = useState({});
  const Login = (User) => {
    setUser(User);
  };

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ user, Login }}>
        <Switch>
          <Route exact path={["/explore", "/"]}>
            <Explore />
          </Route>
          <Route exact path="/myaccount">
            {!Object.keys(user).length ? <Redirect to="/" /> : <MyAccount />}
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/upload">
            {!Object.keys(user).length ? <Redirect to="/login" /> : <Upload />}
          </Route>
          <Route exact path="/login">
            {!Object.keys(user).length ? (
              <LogIn />
            ) : (
                <Redirect to="/myaccount" />
              )}
          </Route>
          <Route exact path="/signup">
            {!Object.keys(user).length ? (
              <SignUp />
            ) : (
                <Redirect to="/myaccount" />
              )}
          </Route>
          <Route exact path="/settings">
          <Settings />
          </Route>
          <Route exact path="/logout">
            {!Object.keys(user).length ? <LogOut /> : <Redirect to="/login" />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
