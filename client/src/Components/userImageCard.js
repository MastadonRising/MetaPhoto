import React, { useState, useEffect } from "react";
import { Card, Image, Button, Modal, Label, Menu, Segment, Grid, List } from "semantic-ui-react";
import API from '../utils/API'

const ImageCard = (props) => {

    const [visible, setvisible] = useState({ visible: false, username: '' })

    function yoirgoi() {
        API.getUserById(props.userID).then((res) => setvisible({ visible: !visible.visible, username: res.data.username }))
    }

    // namer(props.userID)
    console.log(visible)
    return (
        <Card
            style={{
                height: "350px",
                minWidth: '200px',
                margin: 'auto'
            }}>
            {/* {console.log(props)} */}
            <Image
                style={{ height: '275px' }}
                src={props.url}
                ui={false}
            />
            <Label corner='left' as='a' icon={{ name: 'heart' }} onClick={() => console.log('cricket')} />
            <Card.Content
                style={{ textAlign: "center" }} >
                <Modal
                    trigger={
                        <Button icon='info' content='Expand Image' basic />
                    }>
                    <Modal.Content>
                        {(visible.visible === false) ?
                            (<Image centered src={props.url} style={{ maxHeight: '70vh' }} />) :
                            (<Segment>
                                <Grid columns='2' stackable>
                                    <Grid.Column widths='4'>
                                        <Image src={props.url} />
                                    </Grid.Column>
                                    <Grid.Column widths='12'>
                                        <Segment>
                                            <List>
                                                <List.Item>Date Taken: {props.date}</List.Item>
                                                <List.Item>Route/s: {props.routes}</List.Item>
                                                <List.Item>User: {(visible.username !== '') ? visible.username : null}</List.Item>

                                            </List>
                                        </Segment>
                                    </Grid.Column>

                                </Grid>


                            </Segment>)}
                        <Menu widths='3'>
                            <Menu.Item id={props.id} position='left' icon='thumbs up' content='Like' />
                            <Menu.Item content={(visible.visible === false) ? 'See More Info' : 'Return to Image'} icon='info'
                                onClick={() => (visible.visible === false) ? yoirgoi() : setvisible({ visible: false })} />
                            <Menu.Item id={props.id} position='right' name='thumbs down' content='Dislike' />
                        </Menu>
                    </Modal.Content>
                </Modal>
            </Card.Content>
        </Card>
    );
}
export default ImageCard;
