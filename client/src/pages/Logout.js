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

function LogOut() {
  return (
    <Container id='mainContainer'>

        <Header attached='top' as="h1" id="heading"></Header>
        <MenuBar />

      <Grid textAlign="center" verticalAlign="middle">
        <GridColumn style={{ maxWidth: 450 }}>
          <Divider horizontal hidden />

          <Header as="h2" textAlign="center">
            <Icon name="users" size="mini" /> Later Man!
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

export default LogOut;
