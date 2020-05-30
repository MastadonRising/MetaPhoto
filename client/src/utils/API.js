import axios from "axios";

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.coords.latitude}&lon=${GPS.coords.longitude}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },
  getResources: function () {
    return axios.get("/api/resources");
  },

  postPhoto: function (data) {
    data.filesUploaded.forEach((photo) => {
      console.log(photo);
      if (photo.status === "Stored") {
        let Photo = {
          photoID: photo.handle,
          url: photo.url,
          userID: 1,
          routeID: 1,
        };
        console.log(Photo);
        return axios.post("/api/photo", Photo).then((res) => console.log(res));
      } else {
        alert(`Photo: ${photo.filename} failed to upload`);
      }
    });
  },

  postLike: function (data) {
    let Like = {
      likeID: data.likeID,
      type: data.type,
      userID: data.userID,
    };
    return axios.post("/api/photo" + data.photoID, Like);
  },

  signUpUser: function (data) {
    return axios.post("/api/user", data);
  },
  deleteUserAccount: function (id) {
    return axios.delete("/api/user" + id);
  },
};
