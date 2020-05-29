import axios from "axios";

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.coords.latitude}&lon=${GPS.coords.longitude}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },
  getRoutesbySearch: function (searchTerm) {
    const geoCodeKey = 'jmu2hzM4mHMBWSGPseb1cGFiAZ4CSPKI'
    const url =
      'http://www.mapquestapi.com/geocoding/v1/address?key=' +
      geoCodeKey + '&location=' +
      searchTerm.toLowerCase()
    return axios.get(url)
  },
  getResources: function () {
    return axios.get("/api/resources");
  },
};
