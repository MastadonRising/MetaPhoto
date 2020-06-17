import React, { useContext, useState } from "react";
import { Card, Icon, Menu, Label } from "semantic-ui-react";
import UserContext from "../context/userContext";
import API from "../utils/API";
import placeholderImage from "../assets/pics/mountain.png";

const RouteCard = (props) => {
  // console.log(props)
  const userData = useContext(UserContext);
  const [newUpdate, setNewUpdate] = useState({});

  function handleVoting(evt, type) {
    if (type === "up") {
      console.log(`♥‿♥`, userData.user._id);
      API.postLike(userData.user._id, {
        typeOf: "like",
        userID: userData.id,
      }).then(() => {
        setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
      });
    } else {
      console.log(`(ಥ⌣ಥ)`);
      API.postLike(userData.user._id, {
        typeOf: "dislike",
        userID: userData.id,
      });
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    }
  }

  return (
    <Card style={{ height: "350px", minWidth: "200px", margin: "auto" }}>
      {/* {console.log(props)} */}
      {/* {props.photo ? (
        <Image style={{ height: "150px" }} src={props.photo} ui={false} />
      ) : (
          <Image style={{ height: "150px" }} src={props.imgSmallMed} ui={false} />
        )} */}
      <Card.Content
        style={{
          height: "200px",
          backgroundImage: `url(${
            props.imgSmallMed ? props.imgSmallMed : props.photo
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Label
          corner="left"
          as="a"
          icon={{ name: "heart" }}
          onClick={() => console.log("cricket")}
        />
      </Card.Content>
      <Card.Content style={{ maxHeight: "140px" }}>
        <Card.Header>{props.name} </Card.Header>
        <Card.Description>
          {props.desc ? (
            <p>{props.desc}</p>
          ) : (
            <p>
              {props.rating} || {props.stars}
              <Icon name="star outline" />{" "}
            </p>
          )}
          {props.location ? (
            <ul>
              <li>{props.location[1] + ", " + props.location[0]}</li>
              {props.type ? <li>Type of Climb: {props.type}</li> : null}
              {props.proximity ? (
                <li>Proximity to you: {props.proximity.toFixed(2)} miles</li>
              ) : null}
            </ul>
          ) : null}
        </Card.Description>
      </Card.Content>
      {userData.user.username ? (
        <Menu widths="3" fluid compact>
          <Menu.Item
            id={props.id}
            onClick={(e) => handleVoting(e, "up")}
            position="left"
            icon="thumbs up"
            content="Like"
          />
          <Menu.Item as="a" href={props.url} target="_blank">
            Info
          </Menu.Item>
          <Menu.Item
            id={props.id}
            onClick={(e) => handleVoting(e, "down")}
            position="right"
            icon="thumbs down"
            content="Dislike"
          />
        </Menu>
      ) : (
        <Menu fluid widths="1">
          <Menu.Item as="a" href={props.url} target="_blank">
            Info
          </Menu.Item>
        </Menu>
      )}
    </Card>
  );
};

export default RouteCard;
