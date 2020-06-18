import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import {
  Container,
  Header,
  Image,
  Label,
  Segment,
  Grid,
  Divider,
  Card,
  Menu,
  Dropdown,
  Button,
} from "semantic-ui-react";
import MenuBar from "../Components/Menu";
import UserContext from "../context/userContext";
import UserCard from "../Components/userImageCard";

function Users() {
  const [UserPhotos, setUserPhotos] = useState([]);
  const user = useContext(UserContext);

  const style = UserPhotos.length
    ? { maxHeight: "500px", overflow: "scroll" }
    : { maxHeight: "500px" };

  function getUserPhotos() {
    API.getUsersPhotos(user.user._id).then((data) => {
      setUserPhotos(data.data);
    });
  }

  function upperCaser(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  }

  useEffect(() => {
    getUserPhotos();
  }, [user]);

  return (
    <Container id="mainContainer">
      <Header as="h1" id="heading" attached="top">
        {(user.user.username) ? upperCaser(user.user.username) : 'User'}'s Account
      </Header>
      <MenuBar />
      <Divider />
      <Grid as={Container} stackable columns="2">
        {/* This Column is a user Info Card and only takes up 4 grid columns */}
        <Grid.Column width="4">
          <Card>
            <Image
              src={user.user.profile_photo ? user.user.profile_photo : null}
              alt="user pic"
              style={{maxHeight: '250px'}}
            />
            <Card.Header as="h1">
              Hello,{" "}
              {user.user.username ? upperCaser(user.user.username) : "User"}
            </Card.Header>
            <Card.Content>
              Name:{" "}
              {user.user.firstName
                ? upperCaser(user.user.firstName) +
                  " " +
                  upperCaser(user.user.lastName)
                : "UserName"}{" "}
              <br />
              <Divider />
              Email: {user.user.email}
              <Divider />
              <Button
                basic
                fluid
                content="Settings"
                icon="settings"
                onClick={() => {
                  window.location.href = "/settings";
                }}
              />
              <Divider />
              <Menu compact>
                <Dropdown
                  text="Your Favorites"
                  options={[
                    {
                      key: 1,
                      text: `Photos :  ${
                        user.user.favorites ? user.user.favorites.length : ""
                      }`,
                      onClick: () => setUserPhotos(user.user.favorites.filter(photo => photo.type === 'photo' ? photo : null)),
                    },
                    {
                      key: 2,
                      text: `Routes :  ${
                        user.user.favorites ? user.user.favorites.length : ""
                      }`,
                      // onClick: () => console.log("GET user favorites ROUTES"),
                    },
                  ]}
                  item
                />
              </Menu>
            </Card.Content>
          </Card>
        </Grid.Column>

        {/* This Column is for the users pictures and takes up 12 rows of the grid */}
        <Grid.Column width="12">
          <Segment>
            <Label attached="top">
              {user.user.username ? upperCaser(user.user.username) : "User"}'s
              Photos
            </Label>

            <Grid
              style={style}
              columns={UserPhotos.length < 4 ? UserPhotos.length : 3}
              stackable
            >
              {UserPhotos.map((photos, index) => {
                return (
                  <Grid.Column key={index}>
                    <UserCard {...photos} />
                  </Grid.Column>
                );
              })}
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Users;
