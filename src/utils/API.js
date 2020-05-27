import axios from "axios";
require("dotenv").config();

console.log(process.env);

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.lat}&lon=${GPS.lon}&maxDistance=30&key=${process.env.REACT_APP_MOUNTAIN_API}`;
    return axios.get(queryURI);
  },
};
