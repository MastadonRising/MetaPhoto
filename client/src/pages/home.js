import React from 'react'
import { Container, Header,Button } from 'semantic-ui-react'
import LoginForm from '../Components/loginForm'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Container>
            <Header as='h1' id='heading'>
                Meta-Photo
            </Header>
            <p textAlign='center'>Welcome, and thanks for checking us out. Feel free to check out the Explore tab to find local climbs, resources to get helpful information, or login to your account to view
            saved favorites or to register a new account.
            </p>
            <Button as={Link} to='/login'>Login</Button>
        </Container>
    )
}
export default Home