import React from "react";
import MenuBar from "../Components/Menu";
import {
  Grid,
  Header,
  Icon,
  Divider,
  Container,
  GridColumn,
} from "semantic-ui-react";

function NotFound() {
  return (
    <Container>
      <Header attached="top" as="h1" id="heading"></Header>
      <MenuBar />

      <Grid textAlign="center" verticalAlign="middle">
        <GridColumn style={{ maxWidth: 450 }}>
          <Divider horizontal hidden />

          <Header as="h2" textAlign="center">
            <Icon name="binoculars" size="mini" /> We appreciate your sense of
            exploration... but what you're looking for isn't a thing.
          </Header>
          <img
            src="https://static.rmiguides.com/assets/images/footer_mountain_climbers.png"
            alt="Summitting Mountain CLimbers"
          ></img>
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default NotFound;
