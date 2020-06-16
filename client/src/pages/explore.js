import React, { useState, useEffect, useContext } from "react";
import {
  Header,
  Container,
  Input,
  Button,
  Grid,
  Dropdown,
  Label,
  Tab,
} from "semantic-ui-react";
import Card from "../Components/card";
import MenuBar from "../Components/Menu";
import API from "../utils/API";
import UserContext from "../context/userContext";
import UserImageCard from "../Components/userImageCard";
import UTILS from "../utils/utils.js";

function Explore() {
  const user = useContext(UserContext);
  const [UserPhotos, setUserPhotos] = useState([]);
  const [newUpdate, setNewUpdate] = useState({});
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Lake Tahoe');
  const [range, setRange] = useState(['30']);
  const [sorted, setSorted] = useState({ popSorted: false })
  const [sortKey, setSortKey] = useState("name");
  console.log(user)

  function getUserPhotos() {
    console.log("step 1");
    API.getPhoto().then((data) => {
      // console.log(data);
      setUserPhotos(data.data);
    });
  }

  const style = (localClimbs.length > 4) ? { maxHeight: '500px', overflow: 'scroll' } : { maxHeight: '500px' }

  const panes = [
    {
      menuItem: {key: '0', content: 'Local Climbs', style: { backgroundColor: '#ffffff' } },
      render: () => <Tab.Pane>
        <Grid stackable id="cardGrid" columns="4" style={style}>
          {cardBuilder(localClimbs, 'card ')}
        </Grid>
      </Tab.Pane>,
    },
    {
      menuItem: {key: '1', content: 'User Photos', style: { backgroundColor: '#ffffff' } },
      render: () => <Tab.Pane>
        <Grid stackable id="cardGrid" columns="4" style={style}>
          {cardBuilder(UserPhotos, 'userImageCard')}
        </Grid>
      </Tab.Pane>
    }
  ]

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocalClimbs);
    getUserPhotos();
  }, []);

  const {
    items: sortedClimbs,
    requestSort,
    sortConfig,
  } = UTILS.useSortableData(localClimbs);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  function sortBy(value) {
    switch (value) {
      // onChange={() => {sortBy(`pop`);}}
      case `pop`:
        requestSort(`stars`);
        break;
      // onChange={() => {sortBy(`diff`);}}
      case `diff`:
        requestSort(`rating`);
        break;
      default:
        break;
    }
  }

  function sortByPop() {
    requestSort(`stars`);
    sorted.popSorted
      ? setSorted({ popSorted: false })
      : setSorted({ popSorted: true });
    let oro = localClimbs.sort((a, b) => (a.stars > b.stars ? -1 : 1));
    let jawjackery = oro.map((or) => or);
    setLocalClimbs(jawjackery);
  }

  function upperCaser(string) {
    return (string.substring(0, 1).toUpperCase() + string.substring(1))
  }

  function cardBuilder(array, type) {
    return array.map((data, index) => {
      return (
        <Grid.Column key={index}>
          {type !== "userImageCard" ? (
            <Card {...data} />
          ) : (
              <UserImageCard {...data} />
            )}
        </Grid.Column>
      );
    });
  }

  const Options = [
    { key: 5, text: "5", value: ["5"], description: "miles" },
    { key: 10, text: "10", value: ["10"], description: "miles" },
    { key: 15, text: "15", value: ["15"], description: "miles" },
    { key: 20, text: "20", value: ["20"], description: "miles" },
    { key: 25, text: "25", value: ["25"], description: "miles" },
    { key: 30, text: "30", value: ["30"], description: "miles" },
  ];

  function getLocalClimbs(Data) {
    API.getRoutesByNavigator(Data, range).then((data) => {
      // console.log(data.data.routes);
      var updatedRoutes = data.data.routes.map((route) => {
        // adding a "proximity" factor to use in sorting
        let proximity = UTILS.calculateDistance(
          Data.coords.latitude,
          Data.coords.longitude,
          route.latitude,
          route.longitude,
          "K"
        );
        return { ...route, proximity: proximity };
      });

      console.log(updatedRoutes);

      setLocalClimbs(data.data.routes);
    });
  }

  function handleFavorite(evt, type) {
    API.postFav(evt.target.id, {
      typeOf: type,
      ID: evt.target.id,
    }).then(() => {
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    });
  }

  return (
    <Container id='mainContainer'>
      <Header as="h1" id="heading" attached="top">
        Climbing Routes Nearby {searchTerm ? upperCaser(searchTerm) : "You!"}
      </Header>
      <MenuBar />
      <Container textAlign="center" text style={{ margin: '5px 0' }}>
        <Input
          style={{ width: "99%", margin: 'auto', padding: '3px 0' }}
          fluid
          placeholder="City,   State"
          onChange={(e) => setSearchTerm(e.target.value)}
          labelPosition='right'
          label={{
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
                API.getRoutesByNavigator(coordsObj, range).then((data) => {
                  setLocalClimbs(data.data.routes);
                });
              });
            },
          }}
        />
        <Label style={{ padding: '0 0 3px' }}>
          <Dropdown
            as={Label}
            text={'Sort by: ' + sortKey}
            onChange={(e, value) => {
              console.log(value.value)
              setSortKey(value.value);
            }}
            options={[
              { text: 'Name', value: 'name', key: 0 },
              { text: 'Difficulty', value: 'rating', key: 1 },
              { text: 'Popularit', value: 'stars', key: 2 },
              { text: 'Proximity', value: 'name', key: 3 }
            ]}
          />
          <Button
            className={getClassNamesFor(sortKey) || sortConfig.direction}
            onClick={() => {
              requestSort(sortKey);
            }}
          />


          <Dropdown
            as={Label}
            inline
            text={'Search Radius: ' + range + ' miles'}
            options={Options}
            onChange={(e, value) => setRange(value.value)} />

        </Label>
      </Container>

      <Container>
        <Tab panes={(user.user.username ? panes : [panes[0]])} />
      </Container>


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
