import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserProvider from "../context/userContext";

const MenuBar = () => {
  const userData = useContext(UserProvider.context);

  return (
    <div className="menu-bar">
      {!_.isEmpty(userData) && (
        <Link
          className="btn menu-btn"
          to="/profile"
     
        >
          
        </Link>
      )}

      {_.isEmpty(userData) && (
        <a className="btn menu-btn disabled" href="/">
          <img
            src={PassportLogo}
            alt="passport.js logo"
            style={{ height: 19 }}
          />
        </a>
      )}

      <Link className="btn menu-btn" to="/" title="Home">
        <HomeIcon />
      </Link>

      {!_.isEmpty(userData) && (
        <Link className="btn menu-btn" to="/profile" title="Profile">
          <AccountCircleIcon />
        </Link>
      )}

      <UserDropDown />

      {!_.isEmpty(userData) ?  <Menu.Item as={Link} to="/logout" name="Logout" /> :<Menu.Item as={Link} to="/login" name="Login" /
    }
    </div>
<nav style={{ float: "left" }}>
  <Menu vertical>
    {/* <Menu.Item as={Link} to="/" name="Home" /> */}
    <Menu.Item as={Link} to="/explore" name="Explore" />
    <Menu.Item as={Link} to="/myaccount" name="My Account" />
    <Menu.Item as={Link} to="/grv" name="GRV Test Playground" />
  </Menu>
</nav>;
  );
};

export default MenuBar;

