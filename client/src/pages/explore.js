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
  Segment,
} from "semantic-ui-react";
import Card from "../Components/card";
import MenuBar from '../Components/Menu'
import API from "../utils/API";
import UserContext from "../context/userContext";
import UserImageCard from '../Components/userImageCard'



function Explore() {
  const user = useContext(UserContext);
  const [UserPhotos, setUserPhotos] = useState([]);
  const [newUpdate, setNewUpdate] = useState({});

  function getUserPhotos() {
    console.log("step 1");
    API.getPhoto().then((data) => {
      console.log(data);
      setUserPhotos(data.data);
    });
  }
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Lake Tahoe');
  const [range, setRange] = useState(['30']);
  const [sorted, setSorted] = useState({ popSorted: false })
  const style = (localClimbs.length > 4) ? { maxHeight: '500px', overflow: 'scroll' } : { maxHeight: '500px' }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
    getUserPhotos()
  }, []);

  function sortByPop() {
    (sorted.popSorted) ? setSorted({ popSorted: false }) : setSorted({ popSorted: true })
    let oro = localClimbs.sort((a, b) => (a.stars > b.stars) ? -1 : 1)
    let jawjackery = oro.map(or => or);
    setLocalClimbs(jawjackery)
  }

  function cardBuilder(array, type) {
    return (
      array.map((data, index) => {
        return (
          <Grid.Column key={index}>
            {(type !== 'userImageCard') ? <Card {...data} /> : <UserImageCard {...data} />}
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

  function handleFavorite(evt, type) {
      API.postFav(evt.target.id, {
        typeOf: type,
        ID: evt.target.id ,
      }).then(() => {
        setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
      });
    } 
  }
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
          <Label>
            Sort by Difficulty: { ' ' }
          <Checkbox inline toggle />
          </Label>
          <Label>
            Sort by Popularity: { ' ' }
          <Checkbox inline onChange={sortByPop} toggle />
          </Label>
          <Label>
            Search Radius: { ' ' } 
          <Dropdown
            inline
            text={range}
            options={Options}
            onChange={(e, value) => setRange(value.value)}
          />
          </Label>
          
        </Container>

      </Container>


      {(localClimbs.length) ?
        <Segment>
          <Label attached='top'>Routes to Explore</Label>
          <Grid id="cardGrid" columns="4" style={style}>
            {cardBuilder(localClimbs, 'card ')}
          </Grid>
        </Segment> : null}
      <Divider style={{ height: '10px' }} hidden />

      {(user.user.username) ?
        <Segment>
          <Label attached='top'>Routes to Explore</Label>
          <Grid id="cardGrid" columns="4" style={style}>
            {cardBuilder(UserPhotos, 'userImageCard')}
          </Grid>
        </Segment> :
        null}

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
