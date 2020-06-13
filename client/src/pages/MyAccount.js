import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
<<<<<<< HEAD
import {
  Container,
  Header,
  Image,
  Label,
  Segment,
  Grid,
} from "semantic-ui-react";
=======
import { Container, Header, Image, Label, Segment, Grid, Divider, Card, Button, Menu, Dropdown } from 'semantic-ui-react'
>>>>>>> 4e3448b691c041644d5e84adafd5186fa7491f5c
import MenuBar from "../Components/Menu";
import UserContext from "../context/userContext";

function Users() {
  const [UserPhotos, setUserPhotos] = useState([]);
  const user = useContext(UserContext);

  const style = (UserPhotos.length) ? { maxHeight: '500px', overflow: 'scroll' } : { maxHeight: '500px' }

  function getUserPhotos() {
    API.getUsersPhotos(user.user._id).then((data) => {
      setUserPhotos(data.data);
    });
  }

  function upperCaser(string) {
    return (string.substring(0, 1).toUpperCase() + string.substring(1))
  }

  useEffect(() => {
    getUserPhotos();
  }, [user]);

  return (
    <Container>
      <Header as="h1" id="heading" attached="top">
        <img src={user.user.profile_photo} alt="user pic"></img>
        Your Account
        <i
          className="fa fa-cog"
          style={{ color: "red", fontSize: "15px" }}
          onClick={() => {
            window.location.href = "/settings";
          }}
        ></i>
      </Header>
      <MenuBar />
<<<<<<< HEAD
      <Segment>
        <Header as={Label} attached="top">
          User Photos
        </Header>
        <Container style={{ maxHeight: "500px", overflow: "scroll" }}>
          {UserPhotos.map((photos, index) => {
            return (
              <Image
                style={{ margin: "auto" }}
                alt="Here are your cards"
                key={index}
                src={photos.url}
              ></Image>
            );
          })}
        </Container>
      </Segment>
=======
      <Divider />
      <Grid stackable columns='2'>
        {/* This Column is a user Info Card and only takes up 4 grid columns */}
        <Grid.Column width='4'>
          <Card>
            <Card.Header as='h1'>
              Hello, {(user.user.username) ? (upperCaser(user.user.username)) : 'User'}
            </Card.Header>
            <Card.Content>
              Name: {(user.user.firstName) ? (upperCaser(user.user.firstName) + ' ' + upperCaser(user.user.lastName)) : 'UserName'} <br />
              <Divider />
              Email: {user.user.email}
              <Divider />
              <Menu compact>
                <Dropdown
                  text='Your Favorites'
                  options={[
                    { key: 1, text: `Photos :  ${(user.user.favorites) ? user.user.favorites.length : ''}`, onClick: () => console.log('GET user favorite PHOTOS') },
                    { key: 2, text: `Routes :  ${(user.user.favorites) ? user.user.favorites.length : ''}`, onClick: () => console.log('GET user favorites ROUTES') }
                  ]}
                  item />
              </Menu>
            </Card.Content>
          </Card>
        </Grid.Column>

        {/* This Column is for the users pictures and takes up 12 rows of the grid */}
        <Grid.Column width='12'>
          <Segment>
            <Label attached='top'>
              {
                (user.user.username) ? (upperCaser(user.user.username)) : 'User'
              }'s Photos</Label>

            <Grid style={style} columns={(UserPhotos.length < 4) ? UserPhotos.length : 3} stackable>

              {UserPhotos.map((photos, index) => {
                return <Grid.Column>
                  <Image
                    label={{
                      as: 'a',
                      corner: 'left',
                      icon: 'heart'
                    }}
                     centered alt={photos.routeID} key={index} src={photos.url} />
                </Grid.Column>;
              })}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>

>>>>>>> 4e3448b691c041644d5e84adafd5186fa7491f5c
    </Container>
  );
}

export default Users;
