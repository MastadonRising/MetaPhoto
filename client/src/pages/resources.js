import React, { useState, useEffect } from "react";
import Card from "../Components/card";
import { Grid, Header, Container } from "semantic-ui-react";
import API from "../utils/API";

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
      <Header id='heading' as="h1" >Climbing Resources</Header>
      <Grid columns={resources.length}>
        {resources.map((resource, index) => {
          return (
            <Grid.Row id='para-row' style={{backgroundImage: `url("/images/resources-${index}.jpg")`}} key={resource.name}>
              <Card {...resource} />
            </Grid.Row>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Resources;
