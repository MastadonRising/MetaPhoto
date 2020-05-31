import _ from "lodash";
import React from "react";
import { Grid, Container } from "semantic-ui-react";
import RouteCard from "./routeCard";

const columns = (cardCount, cardWidth) => {
  let morph = _.times(cardCount, (i) => (
    <Grid.Column width={cardWidth} key={i}>
      <Container>
        <RouteCard />
      </Container>
    </Grid.Column>
  ));
  return morph;
};
const GridExampleGrid = (props) => {
  console.log(props);
  return <Grid stackable> {columns(props.cardCount, props.cardWidth)}</Grid>;
};

export default GridExampleGrid;
