import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import Home from './components/pages/Home'
import Explore from './components/pages/Explore'
import MyAccount from './components/pages/MyAccount'

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{float: 'left'}}>
          <Menu vertical>
            <Menu.Item
              as={Link}
              to="/"
              name='Home'
            />
            <Menu.Item
              as={Link}
              to="/explore"
              name='Explore'
            />
            <Menu.Item
              as={Link}
              to="/myaccount"
              name='My Account'
            />
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/myaccount">
            <MyAccount />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





