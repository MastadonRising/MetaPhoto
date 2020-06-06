import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider,
  Message,
} from "semantic-ui-react";
import API from "../utils/API";
function logout() {
  API.logout();
}
function LogIn() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  function login() {
    console.log("Logging In");
    API.login(loginUsername, loginPassword);
  }
  function getUser() {
    API.getUser(setData);
  }
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Divider horizontal hidden />
        <Header as="h2" textAlign="center">
          <Icon name="users" size="mini" /> Log-in to your account
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <Button
              icon="sign in alternate"
              fluid
              basic
              size="large"
              onClick={login}
            >
              Login
            </Button>
            <Button
              icon="sign in alternate"
              fluid
              basic
              size="large"
              onClick={logout}
            >
              Login
            </Button>
            <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
              New to us?{" "}
              <Button basic as={Link} to="/signup" name="signup">
                Sign Up
              </Button>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default LogIn;
