import React from 'react'
import { Container, Divider, Button } from 'semantic-ui-react'
import CardHolder from '../cardHolder'
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>

      <Container>
        <h2>Welcome to MetaPhoto</h2>
        <Divider hidden />
        <Container text >
          <p>
            Thanks for us out! Use this site to keep track of climbs you loved, learn about new climbs to do, and best of all, tell YOUR climbing story to the world.
          </p>
          <Container textAlign='center' text>
            <Button as={ Link } to='/myaccount' basic>Would you like to Login?</Button>
            <Divider horizontal >OR</Divider>
            <Button as={ Link } to='/explore' basic>Explore without login</Button>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default Home