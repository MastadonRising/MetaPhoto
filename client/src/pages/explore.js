import React, { Component } from "react";
import API from "../utils/API";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {},
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
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
      </div>
    );
  }
}

export default Explore;
// this.setState({ routes: res.data.routes})
