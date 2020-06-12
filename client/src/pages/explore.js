import React, { useState, useEffect, useContext } from "react";
import {
  Header,
  Container,
  Input,
  Button,
  Divider,
  Grid,
  Checkbox,
  Dropdown,
  Label,
} from "semantic-ui-react";
import Card from "../Components/card";
import MenuBar from "../Components/Menu";
import API from "../utils/API";
import UserContext from "../context/userContext";



function Explore() {
  const user = useContext(UserContext);
  const [UserPhotos, setUserPhotos] = useState([]);

  function getUserPhotos() {
    console.log("step 1");
    API.getPhoto().then((data) => {
      console.log(data);
      setUserPhotos(data.data);
    });
  }
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('San Fransisco');
  const [range, setRange] = useState(['30']);
  const [sorted, setSorted] = useState({ popSorted: false })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
  });

  function sortByPop() {
    (sorted.popSorted) ? setSorted({ popSorted: false }) : setSorted({ popSorted: true })
    let oro = localClimbs.sort((a, b) => (a.stars > b.stars) ? -1 : 1)
    let jawjackery = oro.map(or => or);
    setLocalClimbs(jawjackery)
  }

  function cardBuilder(climbs) {
    return (
      climbs.map((route, index) => {
        return (
          <Grid.Column key={index}>
            <Card {...route} />
          </Grid.Column>
        )
      }))
  }

  const Options = [
    { key: 5, text: "5", value: "5", description: 'miles' },
    { key: 10, text: "10", value: "10", description: 'miles' },
    { key: 15, text: "15", value: "15", description: 'miles' },
    { key: 20, text: "20", value: "20", description: 'miles' },
    { key: 25, text: "25", value: "25", description: 'miles' },
    { key: 30, text: "30", value: "30", description: 'miles' },
  ];
  function getLocalClimbs(data) {
    API.getRoutesByNavigator(data, range).then((data) => {
      setLocalClimbs(data.data.routes);
    });
  }
  // handleChange(value) {this.setState({ range: value });}
  return (
    <Container>
      <Header as="h1" id="heading" attached='top'>
        Climbing Routes Nearby {searchTerm ? searchTerm : "You!"}
      </Header>
      <MenuBar />
      <Divider horizontal />
      <Container textAlign="center" text style={{ backgroundColor: 'grey' }}>
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
                API.getRoutesByNavigator(coordsObj, range).then((data) => { setLocalClimbs(data.data.routes) }
                );
              });
            },
          }}
        />
        <Container text>
          <Checkbox toggle label='Sort by Rating' />
          <Checkbox onChange={sortByPop} toggle label='Sort by Popularity' />
          <Dropdown
            as={Label}
            text='Search Radius'
            options={Options}
            onChange={(e, value) => setRange(value.value)}
          />
        </Container>

      </Container>
      <Divider horizontal />

      <Grid id="cardGrid" columns="4">
        {cardBuilder(localClimbs)}
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
