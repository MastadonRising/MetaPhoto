import React, { Component } from "react";
import API from "../utils/API";
import { Header, Container, Input, Button, Divider, Grid } from "semantic-ui-react";
import Card from '../Components/card'

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {},
      searchTerm: '',
      routeResults: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      API.getRoutesbyLatLon(position).then((res) =>
        console.log(JSON.stringify(res.data.routes))
      );
    });
  } 


  render() {
    return (
      <Container>
        <Header as='h1'>Climbing Routes Near {(this.state.searchTerm) ? (this.state.searchTerm[0].toUpperCase() + this.state.searchTerm.slice(1)) : 'You!'}</Header>

        <Divider horizontal />
        <Container textAlign='center'>
          <Input
            style={{width: '400px'}}
            placeholder='City,   State'
            onChange={(e, target) => this.setState({ searchTerm: target.value })}
            icon={
              {
                as: Button,
                content: 'search',
                onClick: () => {
                  API.getRoutesbySearch(this.state.searchTerm).then((res) => {
                    let coordsObj = {
                      coords: {
                        latitude: res.data.results[0].locations[0].latLng.lat,
                        longitude: res.data.results[0].locations[0].latLng.lng
                      }
                    }
                    API.getRoutesbyLatLon(coordsObj).then(res => this.setState({ routeResults: res.data.routes }))
                  })
                }
              }
            } />
        </Container>

        <Divider horizontal />

        <Grid columns='4'>
          {this.state.routeResults.map((route, index) => {
            return <Grid.Column key={route.id}><Card  {...route} /></Grid.Column>;
          })}
        </Grid>

      </Container>
    )
  }
}

export default Explore;
// this.setState({ routes: res.data.routes})
