import React, { useState, useEffect } from "react";
import Card from "../Components/card";
import { Grid, Header, Container, Divider, Label } from "semantic-ui-react";
import API from "../utils/API";
import MenuBar from '../Components/Menu'
import Background from '../assets/images/HenryXuUnsplash.png'
import Background2 from '../assets/images/Charles.png'

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAllResources();
  }, []);

  function getAllResources() {
    API.getResources()
      .then((data) => setResources(data.data))
      .catch((err) => console.log(err));
  }



  return (
    <Container>
<<<<<<< HEAD
      <Header id='heading' as="h1" >Climbing Resources</Header>
      <Grid columns={resources.length}>
        {resources.map((resource, index) => {
          return (
            <Grid.Row id='para-row' style={{backgroundImage: `url("/images/resources-${index}.jpg")`}} key={resource.name}>
=======
      <Header attached='top' id='heading' as="h1">Climbing Resources</Header>
      <MenuBar />
      <Divider />
      <Grid centered columns={4} verticalAlign='middle'>
        <Grid.Row id={'para-row'} style={{backgroundImage: `url(${Background})`}} >
          {resources.map((resource, index) => {
            return (
              (resource.level === 1) ? <Grid.Column  key={index}>
              <Card {...resource} />
            </Grid.Column> : null
            );
          })}
        </Grid.Row>
        <Grid.Row id={'para-row'} style={{backgroundImage: `url(${Background2})`}} >
          {resources.map((resource, index) => {
            return (
              (resource.level === 2) ? <Grid.Column  key={index}>
>>>>>>> 5b0a745502e120210ff62b4c35098d7c5be09b8d
              <Card {...resource} />
            </Grid.Column> : null
            );
          })}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Resources;
