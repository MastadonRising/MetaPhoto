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

export default function App() {
  const [state, setState] = useState({
    loggedIn: false
  })
  function updateLogIn(status) {
    setState({ loggedIn: status });
  }


  return (
    <Router>
      <Container>
<<<<<<< HEAD
        <nav style={{ float: "left" }}>
          <Menu vertical>
            <Menu.Item as={Link} to='/' name='Home'/>
            <Menu.Item as={Link} to="/explore" name="Explore" />
            <Menu.Item as={Link} to="/myaccount" name="My Account" />
            <Menu.Item as={Link} to="/resources" name='Resources' />
            <Menu.Item as={Link} to="/upload" name='Upload' />
            {(state.loggedIn) ? <Menu.Item as={Button} content='Logout' onClick={() => API.logout().then(res => console.log(res))} /> : null }
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
=======
           <Switch>
>>>>>>> 833355d29e373542ed082a3bd0f6e17268464f69
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
            <Upload  />
          </Route>
          <Route exact path="/login">
            <LogIn {...state} stateChanger={updateLogIn}  />
          </Route>
          <Route exact path="/grv">
            <GRVTest />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/grv">
            <GRVTest  />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
