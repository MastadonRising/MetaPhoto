import React, { useState, useEffect, useContext } from "react";
import API from "../utils/API";
import { Container, Header } from "semantic-ui-react";
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
  }, []);

  return (
    <Container>
      <Header id="heading" as="h1">
        Using geolocation JavaScript API in React
      </Header>
      <div>
        <h4>User Photos</h4>
        {UserPhotos.map((photos, index) => {
          return (
            <img
              alt="Here are your cards"
              key={photos.photoID}
              src={photos.url}
            ></img>
          );
        })}
      </div>
    </Container>
  );
}

export default Users;
