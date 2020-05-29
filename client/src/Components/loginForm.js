import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider } from 'semantic-ui-react'

const LoginForm = () => (
  <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Divider horizontal hidden />
      <Header as='h2' textAlign='center'>
        <Icon name='users' size='mini' /> Log-in to your account
      </Header>
      <Form size='large'>
        <Segment>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button fluid basic size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message attached='bottom' style={{width: '99%', margin: 'auto'}}>
        New to us?  <Button basic>Sign Up</Button>
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm