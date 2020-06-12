import React, { useState, useEffect } from "react";
import {
  Header,
  Container,
  Input,
  Button,
  Divider,
  Grid,
  Dropdown,
} from "semantic-ui-react";
import Card from "../Components/card";

import API from "../utils/API";

function Explore({ MenuBar }) {
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [range, setRange] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
  }, []);

  const Options = [
    { key: 5, text: "5", value: "5" },
    { key: 10, text: "10", value: "10" },
    { key: 15, text: "15", value: "15" },
    { key: 20, text: "20", value: "20" },
    { key: 25, text: "25", value: "25" },
    { key: 30, text: "30", value: "30" },
  ];
  function getLocalClimbs(data) {
    API.getRoutesByNavigator(data, range).then((data) => {
      setLocalClimbs(data.data.routes);
    });
  }
  // handleChange(value) {this.setState({ range: value });}
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
        <Dropdown
          inline
          options={Options}
          defaultValue={Options[5].value}
          // onChange={handleChange}
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
