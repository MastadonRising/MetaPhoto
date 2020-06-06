import React from 'react'
import { Container, Header,Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Container>
            <Header as='h1' id='heading'>
                Meta-Photo
            </Header>
            <p>Welcome, and thanks for checking us out. Feel free to check out the Explore tab to find local climbs, resources to get helpful information, or login to your account to view
            saved favorites or to register a new account.
            </p>
            <Container text textAlign='center'>
                <Divider horizontal hidden></Divider>
            <Button as={Link} to='/login'>Login</Button>
            </Container>
        </Container>
    )
}
export default Home