import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Transition, Container, Icon } from "semantic-ui-react";
import UserProvider from "../context/userContext";

const MenuBar = () => {
  const userData = useContext(UserProvider.context);
  const [visibleState, setVisibleState] = useState({ visible: false })
  console.log(userData);


  return (
    <Container>
      <Button fluid onClick={() => setVisibleState({ visible: !visibleState.visible })} icon='server' color='white' />
      <Transition visible={visibleState.visible} animation='slide down' duration={500}>
        <Menu id='navMenu' attached='bottom' widths='4'>
          <Menu.Item as={Link} to="/explore" name="Explore" />
          <Menu.Item as={Link} to="/myaccount" name="My Account" />
          <Menu.Item as={Link} to="/upload" name="upload" />
          {userData.username ? (
            <Menu.Item as={Link} to="/logout" name="Logout" />
          ) : (
              <Menu.Item as={Link} to="/login" name="Login" />
            )}
        </Menu>
      </Transition>
    </Container>
  );
};

export default MenuBar;
