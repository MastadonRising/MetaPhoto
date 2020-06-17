import React, { useContext } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import API from "../utils/API";

const MenuBar = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const userData = useContext(UserContext);

  function logout() {
    API.logout();
    user.Login({});
    setTimeout(() => history.push("/"), 1500);
  }

  return (
    <Container>
      {userData.user.username ? (
        <Menu stackable id="navMenu" attached="bottom" widths="5">
          <Menu.Item as={Link} to="/explore" name="Explore" />
          <Menu.Item as={Link} to="/myaccount" name="My Account" />
          <Menu.Item as={Link} to="/upload" name="upload" />
          <Menu.Item as={Link} to="/resources" name="Resources" />
          <Menu.Item as={Link} to="/logout" name="Logout" onClick={logout} />
        </Menu>
      ) : (
        <Menu stackable id="navMenu" attached="bottom" widths="3">
          <Menu.Item as={Link} to="/explore" name="Explore" />
          <Menu.Item as={Link} to="/resources" name="Resources" />
          <Menu.Item as={Link} to="/login" name="Login" />
        </Menu>
      )}
    </Container>
  );
};

export default MenuBar;
