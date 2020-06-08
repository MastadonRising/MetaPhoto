import React, { useState, useEffect } from "react";
import {
  Header,
  Container,
  Input,
  Button,
  Divider,
  Grid,
} from "semantic-ui-react";
import Card from "../Components/card";
import MenuBar from "../Components/Menu";
import API from "../utils/API";

function Explore() {
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
  }, []);

  function getLocalClimbs(data) {
    API.getRoutesByNavigator(data).then((data) => {
      setLocalClimbs(data.data.routes);
    });
  }

  return (
    <Container>
      <Header id="heading" as="h1">
        Climbing Routes Nearby {searchTerm ? searchTerm : "You!"}
      </Header>
      <MenuBar></MenuBar>
      <Divider horizontal />
      <Container textAlign="center">
        <Input
          style={{ width: "400px" }}
          placeholder="City,   State"
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={{
            as: Button,
            content: "search",
            onClick: () => {
              API.getRoutesbySearch(searchTerm).then((res) => {
                let coordsObj = {
                  coords: {
                    latitude: res.data.results[0].locations[0].latLng.lat,
                    longitude: res.data.results[0].locations[0].latLng.lng,
                  },
                };
                API.getRoutesByNavigator(coordsObj).then((data) =>
                  setLocalClimbs(data.data.routes)
                );
              });
            },
          }}
        />
      </Container>
      <Divider horizontal />

      <Grid id="cardGrid" columns="4">
        {localClimbs.map((route, index) => {
          return (
            <Grid.Column key={route.id}>
              <Card {...route} />
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Explore;

// localClimbs  is an array of objects
// strucutre below

// imgSqSmall are small square images the others are wonky sizes
// {
// id: 112840319
// imgMedium: "https://cdn2.apstatic.com/photos/climb/114032367_medium_1516661975.jpg"
// imgSmall: "https://cdn2.apstatic.com/photos/climb/114032367_small_1516661975.jpg"
// imgSmallMed: "https://cdn2.apstatic.com/photos/climb/114032367_smallMed_1516661975.jpg"
// imgSqSmall: "https://cdn2.apstatic.com/photos/climb/114032367_sqsmall_1516661975.jpg"
// latitude: 38.682
// location: (6) ["California", "Lake Tahoe", "Highway 50 Corridor", "Folsom", "Rainbow Boulders", "Area B"]
// longitude: -121.1759
// name: "The Easter Egg"
// pitches: ""
// rating: "V4"
// starVotes: 3
// stars: 4.7
// type: "Boulder"
// url: "https://www.mountainproject.com/route/112840319/the-easter-egg"
// }
