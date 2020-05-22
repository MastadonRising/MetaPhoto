import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactFilestack from "filestack-react";

class App extends Component {
  render() {
    const YOUR_API_KEY = `A3aWEEqJ0RHOqD6biKd4iz`;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MetaPhoto</h2>
        </div>
        <p className="App-intro">
          To get started, open the picker and upload your image.
        </p>

        <ReactFilestack
          apikey={YOUR_API_KEY}
          // actionOptions={PickerOptions}
          componentDisplayMode={{
            type: "button",
            customText: "Click here to open picker",
            customClass: "some-custom-class",
          }}
          onSuccess={(results)=>{
            console.log(results)
          
          }}
        />
      </div>
    );
  }
}

export default App;
