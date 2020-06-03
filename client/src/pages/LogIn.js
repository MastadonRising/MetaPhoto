import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider,
  Message,
  Container,
} from "semantic-ui-react";
import API from "../utils/API";

function LogIn(props) {
  console.log(props)
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(props.state);

  function login() {
    API.login(loginUsername, loginPassword).then(data => {
      (data === 'Successfully Authenticated') ?
        props.logginer( 'true' ) :
        setData({ loggedIn: 'false' })
    })
  }
  function getUser() {
    API.getUser(setData);
  }

  return (
    <Container>
      <Header as="h1">
        Login or Register
      </Header>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Divider horizontal hidden />
          {(data.loggedIn) ?
            <Redirect to='/myaccount' /> :
            <div><Header as="h2" textAlign="center">
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
                    onClick={login}>
                    Login
          </Button>
                  <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
                    New to us?{" "}
                    <Button basic as={Link} to="/signup" name="signup">
                      Sign Up
            </Button>
                  </Message>
                </Segment>
              </Form></div>}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default LogIn;
