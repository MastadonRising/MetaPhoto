import axios from "axios";

export default {
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.lat}&lon=${GPS.lon}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },
  getRoutesByNavigator: function (GPS) {
    let gps = {
      lat: GPS.coords.latitude,
      lon: GPS.coords.longitude,
    };
    return this.getRoutesbyLatLon(gps);
  },
  getRoutesbySearch: function (searchTerm) {
    const geoCodeKey = "jmu2hzM4mHMBWSGPseb1cGFiAZ4CSPKI";
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=" +
      geoCodeKey +
      "&location=" +
      searchTerm.toLowerCase();
    return axios.get(url);
  },
  getResources: function () {
    return axios.get("/api/resources");
  },
  getPhoto: function () {
    return axios.get("/api/photo");
  },
  postPhoto: function (data) {
    let Photo = {
      photoID: data.handel,
      url: data.url,
      imgSmURL: data.imgSmURL,
      imgMedURL: data.imgMedURL,
      routesID: data.routesID,
    };
    console.log(Photo);
    return axios.post("/api/photo", Photo).then((res) => console.log(res));
  },

  postLike: function (data) {
    let Like = {
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

  register: function (NewUser) {
    console.log("step 2", NewUser);
    axios({
      method: "POST",
      data: NewUser,

      withCredentials: true,
      url: "http://localhost:3001/register",
    }).then((res) => {
      res.data === "User Already Exists"
        ? alert("Sorry, A user with that username already exists!")
        : console.log(res);
    });
  },
  login: function (loginUsername, loginPassword) {
    return axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => res);
  },
  logout: function () {
    axios.get("/logout").then((res) => console.log(res));
  },

  getUser: function (setData) {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => {
      setData(res.data);
      console.log(res);
    });
  },

  getPhotoInformation: function () {
    return axios.get(`/api/photos`);
  },
};

// container: undefined
// filename: "2020-04-14 04.16.45.jpg"
// handle: "ObcSrDE4Qc6XuKVEI19x"
// key: undefined
// mimetype: (...)
// name: (...)
// size: (...)
// status: "Stored"
// type: (...)
// uploadTags: undefined
// url: "https://cdn.filestackcontent.com/ObcSrDE4Qc6XuKVEI19x"
// workflows: undefined
