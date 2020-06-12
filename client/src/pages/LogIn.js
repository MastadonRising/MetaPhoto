import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

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
import UserContext from "../context/userContext";
function LogIn() {
  const user = useContext(UserContext);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setUser] = useState({});
  const history = useHistory();

  function login() {
    API.login(loginUsername, loginPassword).then((res) => {
      console.log(user);
      user.Login(res.data);
      console.log(user);
    });
    history.replace("/");
  }

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
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default LogIn;
