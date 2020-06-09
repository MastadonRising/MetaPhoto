import React, { useState } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider,
  Container,
} from "semantic-ui-react";
import API from "../utils/API";

function logout() {
  API.logout();
}
function LogIn() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [data, setData] = useState(props.loggedIn);

  function login() {
    API.login(loginUsername, loginPassword);
  }
  // function getUser(setData) {
  //   API.getUser(setData);
  // }

  return (
    <Container>
      <Header as="h1" id="heading">
        Login or Register
      </Header>
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
                type="userName"
                icon="user"
                iconPosition="left"
                placeholder="Username"
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
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default LogIn;
