import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import LoginForm from '../Components/loginForm'

const Home = () => {
    return (
        <Container>
            <Header as='h1'>
                Meta-Photo
            </Header>
            <p>Welcome, and thanks for checking us out. Feel free to check out the Explore tab to find local climbs, resources to get helpful information, or login to your account to view
            saved favorites or to register a new account.
            </p>
            <LoginForm />
        </Container>
    )
}
export default Home