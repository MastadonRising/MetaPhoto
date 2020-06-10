import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

const CardExampleCard = (props) => (
  <Card style={{ height: "350px", minWidth: '200px' }}>
    {/* {console.log(props)} */}
    {props.photo ? (
      <Image style={{ height: "150px" }} src={props.photo} ui={false} />
    ) : (
        <Image style={{ height: "150px" }} src={props.imgSmallMed} ui={false} />
      )}

    <Card.Content style={{ maxHeight: '140px' }}>
      <Card.Header>{props.name} </Card.Header>
      <Card.Description>
        {props.desc ? <p>{props.desc}</p> : <p>{props.rating} || {props.stars}<Icon name='star outline' /> </p>}
        {props.location ? (
          <ul>
            <li>{props.location[1] + ", " + props.location[0]}</li>
          </ul>
        ) : null}
      </Card.Description>
    </Card.Content>
    <Card.Content
      style={{ textAlign: "center" }}
      extra
    >
      <Button basic as="a" href={props.url} target="blank">
        <Icon name="info" />
        More info
      </Button>
    </Card.Content>
  </Card>
);

export default CardExampleCard;
