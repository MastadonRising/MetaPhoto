import React from "react";

const UserContext = React.createContext({
  _id: "",
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  favorites: [],
  Login: () => {},
});

export default UserContext;
