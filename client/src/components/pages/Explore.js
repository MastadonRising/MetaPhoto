import React, { useState, useEffect } from 'react'
import { Container, Divider, Input, Button } from 'semantic-ui-react'
import CardHolder from '../cardHolder'

function About() {
    const [userQuery, setUserQuery] = useState({
        query: ''
    })

    useEffect(() => {
        console.log(userQuery)
    }, [userQuery])

    return (
        <Container>
            <h2>Explore Local Climbs</h2>
            <Divider hidden />
            <Container text>
                <Input
                    fluid
                    placeholder='Find Routes'
                    action={
                        <Button content='search' onClick={((e) => console.log('You searched for: ', userQuery.query))} />
                    }
                    onChange={(e) => setUserQuery({ query: e.target.value })} />
            </Container>
            <Divider hidden />
            <CardHolder cardCount='8' cardWidth='4' />
        </Container>
    )
}

export default About