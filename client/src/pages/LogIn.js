import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserProvider from "../context/userContext";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Divider,
  Container,
  Message,
} from "semantic-ui-react";
import API from "../utils/API";
import MenuBar from "../Components/Menu"
import { Link } from "react-router-dom";

function LogIn() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();
  // const [data, setData] = useState(props.loggedIn);
  const userData = useContext(UserProvider.context);
  console.log(userData)
  function login() {
    API.login(loginUsername, loginPassword).then((res) => {
      console.log(res.data)
      history.replace("/");
    });
  }
  
  return (
    <Container>
  
      <Header attached='top' as="h1" id="heading">
        MetaPhoto
      </Header>
      <MenuBar />
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
                content='Login'
                onClick={login}
              >
              </Button>
            </Segment>
          </Form>
          <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
            New to us?
            <Button basic as={Link} to="/signup" content="Sign Up" />
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default LogIn;
