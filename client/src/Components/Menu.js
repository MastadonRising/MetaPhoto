import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import UserProvider from "../context/userContext";

const MenuBar = () => {
  const userData = useContext(UserProvider.context);
  console.log(userData);
  return (
    <Menu vertical>
      <Menu.Item as={Link} to="/explore" name="Explore" />
      <Menu.Item as={Link} to="/myaccount" name="My Account" />
      <Menu.Item as={Link} to="/upload" name="upload" />
      {userData.username ? (
        <Menu.Item as={Link} to="/logout" name="Logout" />
      ) : (
        <Menu.Item as={Link} to="/login" name="Login" />
      )}
    </Menu>
  );
};

export default MenuBar;
