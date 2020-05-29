import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Card from '../Components/card'
import { Grid, Header } from "semantic-ui-react";
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
  // .then((res) =>
  //   JSON.stringify(res)
  // );
  // console.log("working");
  
  return (
    <div>
      <Header as='h1'>Climbing Resources</Header>
      <Grid columns={resources.length}>
        {resources.map((resource, index) => {
          return <Grid.Column key={resource.name}><Card  {...resource} /></Grid.Column>;
        })}
      </Grid>
    </div>
  );
}

export default Resources;
