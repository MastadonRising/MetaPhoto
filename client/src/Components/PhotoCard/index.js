import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const CardExampleCard = ({ photos }) =>
  photos.length ? (
    photos.map((photo) => {
      return (
        <Card>
          <Image
            src="/images/rock-climb-unsplash-icon.jpg"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{photo.name}</Card.Header>
            <Card.Meta>
              <span className="date">{photo._id}</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      );
    })
  ) : (
    <h4>"react"</h4>
  );

export default CardExampleCard;
