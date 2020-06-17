import React, { useContext, useState } from "react";
import { Card, Image, Icon, Menu } from "semantic-ui-react";
import UserContext from "../context/userContext";
import API from "../utils/API";

const RouteCard = (props) => {
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

  return (
    <Card style={{ height: "350px", minWidth: "200px", margin: "auto" }}>
      {/* {console.log(props)} */}
      {props.photo ? (
        <Image style={{ height: "150px" }} src={props.photo} ui={false} />
      ) : (
        <Image style={{ height: "150px" }} src={props.imgSmallMed} ui={false} />
      )}

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
            </ul>
          ) : null}
        </Card.Description>
      </Card.Content>
      <Card.Content style={{ textAlign: "center" }} extra>
        <Menu widths="3" fluid>
          <Menu.Item position="left">
            Like
            <Icon name="thumbs up" />
          </Menu.Item>
          <Menu.Item>Info</Menu.Item>
          <Menu.Item position="right">
            <Icon name="thumbs down" />
            Dislike
          </Menu.Item>
        </Menu>
      </Card.Content>
    </Card>
  );
};

export default RouteCard;
