import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import UserContext from "../context/userContext";
import API from "../utils/API";

const MenuBar = () => {
  const history = useHistory();
  function logout() {
    API.logout();
    history.push("/");
  }
  const userData = useContext(UserContext);
  return (
    <div>
      {userData.user.username ? (
        <Menu vertical>
          <Menu.Item as={Link} to="/explore" name="Explore" />
          <Menu.Item as={Link} to="/logout" name="Logout" onClick={logout} />
          <Menu.Item as={Link} to="/myaccount" name="My Account" />
          <Menu.Item as={Link} to="/upload" name="upload" />
          <Menu.Item as={Link} to="/resources" name="Resources" />
        </Menu>
      ) : (
        <Menu vertical>
          <Menu.Item as={Link} to="/explore" name="Explore" />
          <Menu.Item as={Link} to="/resources" name="Resources" />
          <Menu.Item as={Link} to="/login" name="Login" />
        </Menu>
      )}
    </div>
  );
};

export default MenuBar;
