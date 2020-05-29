import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import MyAccount from "./pages/MyAccount";
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import Home from './pages/home'
import "./index.css";
import "./App.css";

export default function App() {
  return (
    <Router>


      <Menu style={{backgroundColor: '#8297cc'}}>
        <Menu.Item as={Link} to="/" name="Home" />
        <Menu.Item as={Link} to="/explore" name="Explore" />
        <Menu.Item as={Link} to="/myaccount" name="My Account" />
        <Menu.Item as={Link} to="/resources" name="Resources" />
      </Menu>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Container>
        <Switch>
          <Route exact path={"/"}>
            <Home />
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
        </Switch>
      </Container>

    </Router>
  );
}
