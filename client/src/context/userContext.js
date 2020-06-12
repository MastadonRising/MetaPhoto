import React from "react";

const UserContext = React.createContext({
  userName: "",
  Login: () => {},
});

export default UserContext;
