import React, { useContext, useState } from "react";
import { Menu, Button, Transition, Container } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import API from "../utils/API";

const MenuBar = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  function logout() {
    API.logout();
    user.Login({});
  }
;
  const [visibleState, setVisibleState] = useState({ visible: false })
  const userData = useContext(UserContext);
  console.log(userData);


  return (
    <Container>
      {/* <Button fluid onClick={() => setVisibleState({ visible: !visibleState.visible })} icon='server' /> */}
      {/* <Transition visible={visibleState.visible} animation='slide down' duration={500}> */}
        {userData.user.username ? (
          <Menu id='navMenu' attached='bottom' widths='5'>
            <Menu.Item as={Link} to="/explore" name="Explore" />
            <Menu.Item as={Link} to="/myaccount" name="My Account" />
            <Menu.Item as={Link} to="/upload" name="upload" />
            <Menu.Item as={Link} to="/resources" name="Resources" />
            <Menu.Item as={Link} to="/logout" name="Logout" onClick={logout} />
          </Menu>
        ) : (
            <Menu  id='navMenu' attached='bottom' widths='3'>
              <Menu.Item as={Link} to="/explore" name="Explore" />
              <Menu.Item as={Link} to="/resources" name="Resources" />
              <Menu.Item as={Link} to="/login" name="Login" />
            </Menu>
          )}
      {/* </Transition> */}
    </Container>
  )
}



export default MenuBar
