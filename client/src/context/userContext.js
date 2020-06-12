import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  function update(user) {
    setUser(user)
  }

  useEffect(() => {
    fetch("/user")
      .then((res) => console.log(res))
      // .then((res) => setUser(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <context.Provider value={user} updater={update}>{children}</context.Provider>;
};

UserProvider.context = context;

export default UserProvider;
