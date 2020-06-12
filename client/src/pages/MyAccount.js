import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Container, Header} from 'semantic-ui-react'
import MenuBar from "../Components/Menu";
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
       <Header as="h1" id="heading" attached='top'>
        Your Account
      </Header>
      <MenuBar />

      <Container>
        <h4>User Photos</h4>
        {UserPhotos.map((photos, index) => {
          return <img alt='Here are your cards' key={index} src={photos.url}></img>;
        })}
      </Container>
    </Container>
  );
}

export default Users;
