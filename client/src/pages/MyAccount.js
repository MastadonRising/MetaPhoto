import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Container, Header} from 'semantic-ui-react'
function Users() {
  const [UserPhotos, setUserPhotos] = useState([]);

  function getUserPhotos() {
    console.log("step 1");
    API.getPhoto().then((data) => {
      console.log(data);
      setUserPhotos(data.data);
    });
  }

  useEffect(() => {
    getUserPhotos();
  }, []);

  return (
    <Container>
      <Header id='heading' as='h1'>Using geolocation JavaScript API in React</Header>
      <div>
        <h4>User Photos</h4>
        {UserPhotos.map((photos, index) => {
          return <img alt='Here are your cards' key={photos.photoID} src={photos.url}></img>;
        })}
      </div>
    </Container>
  );
}

export default Users;
