import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import AppPrime from "./App_prime";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppPrime />, document.getElementById("root"));
registerServiceWorker();
