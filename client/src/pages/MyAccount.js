import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Container, Header, Image, Label, Segment, Grid } from 'semantic-ui-react'
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
      <Segment>
        <Header as={Label} attached='top'>User Photos</Header>
        <Container style={{ maxHeight: '500px', overflow: 'scroll' }}>

          {UserPhotos.map((photos, index) => {
            return <Image style={{margin:'auto'}} alt='Here are your cards' key={index} src={photos.url}></Image>;
          })}
        </Container>
      </Segment>

    </Container>
  );
}

export default Users;
