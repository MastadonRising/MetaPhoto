import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'

const CardExampleCard = () => (
  <Card>
    <Image as='a' href='' src={require('../assets/images/mounatins.png')} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Route Name Here</Card.Header>
      <Card.Meta>
        <span className='date'>Difficulty Here</span>
      </Card.Meta>
      <Card.Description>
        Short Description or location info here
      </Card.Description>
    </Card.Content>
    <Card.Content style={{textAlign: 'center'}} extra>
        <Button basic> <Icon name='info' />More info</Button>
       
    </Card.Content>
  </Card>
)

export default CardExampleCard