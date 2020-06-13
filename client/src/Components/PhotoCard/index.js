import { React, useContext } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import UserContext from "../../context/userContext";

const userData = useContext(UserContext);
const [newUpdate, setNewUpdate] = useState({});

function handleVoting(evt, type) {
  if (type === "up") {
    console.log(`♥‿♥`, evt.target.id);
    API.postLike(evt.target.id, {
      typeOf: "like",
      userID: userData._id,
    }).then(() => {
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    });
  } else {
    console.log(`(ಥ⌣ಥ)`);
    API.postLike(evt.target.id, {
      typeOf: "dislike",
      userID: userData._id,
    });
    setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
  }
}

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
