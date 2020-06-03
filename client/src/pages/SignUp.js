import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
  Divider,
} from "semantic-ui-react";
import API from "../utils/API";

function SignUp() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  function register() {
    let NewUser = {
      userName: registerUsername,
      password: registerPassword,
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
    };

    API.register(NewUser);
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Divider horizontal hidden />
        <Header as="h2" textAlign="center">
          <Icon name="users" size="mini" /> Register for an account
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="UserName"
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <Form.Input
              fluid
              icon="address book"
              iconPosition="left"
              placeholder="First Name"
              onChange={(e) => setRegisterFirstName(e.target.value)}
            />
            <Form.Input
              fluid
              icon="address book"
              iconPosition="left"
              placeholder="Last Name"
              onChange={(e) => setRegisterLastName(e.target.value)}
            />
            <Form.Input
              fluid
              icon="envelope open"
              iconPosition="left"
              placeholder="Email"
              type="Email"
              onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <Button fluid basic size="large" onClick={register}>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
          Already a Memeber?{" "}
          <Button basic as={Link} to="/login" name="login">
            Log In
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
