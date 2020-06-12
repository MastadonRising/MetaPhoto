import React, { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import UserContext from "../context/userContext";
import API from "../utils/API";

const MenuBar = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  function logout() {
    API.logout();
    user.Login({});
  }
<<<<<<< HEAD
  let location = useLocation()
  useEffect(()=>{
    console.log(location)
  },[])
  const userData = useContext(UserProvider.context);
  console.log(userData)

=======
  const userData = useContext(UserContext);
>>>>>>> 86d834492aa967f8b70bcdbe82ef91499d033f9e
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
