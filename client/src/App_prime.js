import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import ReactFilestack from "filestack-react";
// require('dotenv').config()
import ImageUploadx from "./Components/ImageUpload";

function App() {
  // console.log(process.env);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to MetaPhoto</h2>
      </div>
      <p className="App-intro">
        To get started, open the picker and upload your image.
      </p>
      <ImageUploadx />
    </div>
  );
}

export default App;
