import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import {
  Container,
  Header,
  Image,
  Label,
  Segment,
  Grid,
} from "semantic-ui-react";
import MenuBar from "../Components/Menu";
import UserContext from "../context/userContext";
function Users() {
  const [UserPhotos, setUserPhotos] = useState([]);
  const user = useContext(UserContext);

  function getUserPhotos() {
    API.getUsersPhotos(user.user._id).then((data) => {
      setUserPhotos(data.data);
    });
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
    </Container>
  );
}

export default Users;
