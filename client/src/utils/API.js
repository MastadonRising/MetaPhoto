import axios from "axios";

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.lat}&lon=${GPS.lon}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },

  createUser: function (user) {
    axios.post(`/api/users`, user).then((response) => response);
  },

  getUserInformation: function () {
    return axios.get(`/api/users`);
  },

  getPhotoInformation: function () {
    return axios.get(`/api/photos`);
  },
  updatePhoto: function (id, data) {
    return axios.put(`/api/photos/` + id, data);
  },

  savePhoto: function (photo) {
    return axios.post(`/api/photos`, photo);
  },
};
