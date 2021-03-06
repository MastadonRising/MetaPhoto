import axios from "axios";
const baseURL = "https://metaphotojs.herokuapp.com/";

export default {
  // Gets all routes by lat,lon
  getRoutesByNavigator: function (GPS, range) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.coords.latitude}&lon=${GPS.coords.longitude}&maxDistance=${range}&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },
  getRoutesbySearch: function (searchTerm) {
    const geoCodeKey = "jmu2hzM4mHMBWSGPseb1cGFiAZ4CSPKI";
    const url =
      "https://www.mapquestapi.com/geocoding/v1/address?key=" +
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
  getUsersPhotos: function (id) {
    // console.log(id);
    return axios.get("/api/photo" + id);
  },
  getPhotoByHandle: function (handle) {
    return axios.get("/api/photohandle" + handle);
  },
  postSinglePhoto: function (photo) {
    return axios.post("/api/photo", photo).then((res) => {});
  },
  postPhoto: function (data) {
    let userID = data.userID;
    data.filesUploaded.forEach((photo) => {
      console.log(photo);
      if (photo.status === "Stored") {
        let Photo = {
          handle: photo.handle,
          url: "https://cdn.filestackcontent.com/" + photo.handle,
          userID: userID,
          routeID: 1,
        };
        console.log(Photo);
        return axios.post("/api/photo", Photo).then((res) => {
          // console.log(res);
        });
      } else {
        alert(`Photo: ${photo.filename} failed to upload`);
      }
    });
  },
  updatePhoto: function (id, photo) {
    return axios.put("/api/photo" + id, photo);
  },
  updatePhotoByHandle: function (handle, photo) {
    return axios.put("/api/photohandle" + handle, photo);
  },

  postLike: function (id, data) {
    let Like = {
      typeOf: data.typeOf,
      userID: data.userID,
    };
    return axios.post("/api/photo" + id, Like);
  },
  postFavorite: function (id, data) {
    let Fav = {
      typeOf: data.typeOf,
      userID: data.userID,
    };
    return axios.post("/api/favorite" + id, Fav);
  },

  signUpUser: function (data) {
    return axios.post("/api/user", data);
  },
  deleteUserAccount: function (id) {
    return axios.delete("/api/user" + id);
  },

  register: function (NewUser) {
    console.log("step 2", NewUser);
    return axios({
      method: "POST",
      data: NewUser,
      withCredentials: true,
      url: `${baseURL}register`,
    })
  },
  login: function (loginUsername, loginPassword) {
    return axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${baseURL}login`,
    });
  },
  logout: function () {
    axios.get("/logout");
  },

  getUser: function (setData) {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${baseURL}user`,
    }).then((res) => {
      setData(res.data);
      // console.log(res);
    });
  },

  getUserById: function (userID) {
    return axios.get(`/api/user${userID}`);
  },

  getPhotoInformation: function () {
    return axios.get(`/api/photos`);
  },

  updateUserProfilePic: function (id, data) {
    return axios.put(`/api/user${id}`, data);
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
