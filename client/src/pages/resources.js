import React, { Component } from "react";
import API from "../utils/API";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    API.getResources().then((res) => console.log(JSON.stringify(res)));
    console.log("working");
  }

  render() {
    return (
      <div>
        <h4>hello</h4>
      </div>
    );
  }
}

export default Resources;
