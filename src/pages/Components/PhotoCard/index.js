import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

const CardExampleCard = ({ photos }) => {
  return (
    <Card.Group>
      {photos.length ? (
        photos.map((photo, index) => {
          return (
            <Card key={index}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="/images/rock-climb-unsplash-icon-150x150.jpg"
                />
                <Card.Header>{photo.routeID}</Card.Header>
                <Card.Meta>Uploaded by {photo.userID}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
          );
        })
      ) : (
        <h4>Loading</h4>
      )}
    </Card.Group>
  );
};

export default CardExampleCard;
