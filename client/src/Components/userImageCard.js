import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

const CardExampleCard = (props) => (
    <Card style={{ height: "350px", minWidth: '200px', margin: 'auto' }}>
        {console.log(props)}
        <Image style={{ height: "150px" }} src={props.url} ui={false} />

        <Card.Content style={{ maxHeight: '140px' }}>
            <Card.Header>{props.routeID} </Card.Header>
            <Card.Description>
                {props.likes}
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
