import React, { useState, useContext, useEffect } from "react";
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
      .then((res) => setUser(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const userData = useContext(UserContext.context);
  return (
    <Router>
      <UserContext.Provider value={{ user, Login }}>
        <Switch>
          <Route exact path={["/explore", "/"]}>
            <Explore />
          </Route>
          <Route exact path="/myaccount">
            {/* {!userData ? <Redirect to="/" /> : <MyAccount />} */}
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
      </UserContext.Provider>
    </Router>
  );
}
