import axios from "axios";
require("dotenv").config();

console.log(process.env)

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
<<<<<<< HEAD:src/utils/API.js
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.lat}&lon=${GPS.lon}&maxDistance=30&key=${process.env.REACT_APP_MOUNTAIN_API}`;
=======
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.coords.latitude}&lon=${GPS.coords.longitude}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
>>>>>>> 9fc434b6439893dfc444fcd611f6a4b41f2e2f2b:client/src/utils/API.js
    return axios.get(queryURI);
  },
};
