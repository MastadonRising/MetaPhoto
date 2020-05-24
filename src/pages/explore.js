import React, { Component } from "react";
import API from "../utils/API";
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      API.getRoutesbyLatLon(position).then((res) => console.log(res));
    });
  }

  render() {
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
      </div>
    );
  }
}

export default Explore;
