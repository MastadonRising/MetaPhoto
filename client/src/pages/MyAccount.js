import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Container, Header, Grid} from 'semantic-ui-react'
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
       <Grid columns='2' verticalAlign='middle'>
        <Grid.Column width='3' height='200px'>
          <MenuBar />
        </Grid.Column>
        <Grid.Column width='13'>
          <Header as="h1" id="heading">
            MetaPhoto
      </Header>
        </Grid.Column>
      </Grid>
      <Container>
        <h4>User Photos</h4>
        {UserPhotos.map((photos, index) => {
          return <img alt='Here are your cards' key={photos.photoID} src={photos.url}></img>;
        })}
      </Container>
    </Container>
  );
}

export default Users;
