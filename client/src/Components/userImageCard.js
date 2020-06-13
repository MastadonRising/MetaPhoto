import React from "react";
import { Card, Image, Button, Icon, Modal } from "semantic-ui-react";

const CardExampleCard = (props) => (
    <Card
        style={{
            height: "350px",
            minWidth: '200px',
            margin: 'auto'
        }}>
        {console.log(props)}
        <Image
            style={{ height: '275px' }}
            src={props.url}
            ui={false}
             />
        <Card.Content
            style={{ textAlign: "center" }} >
            <Modal
                trigger={
                    <Button basic>
                        <Icon name="info" />
        Expand Image
        </Button>}>
                <Modal.Content>
                    <Image centered src={props.url} />
                </Modal.Content>
            </Modal>
        </Card.Content>
    </Card>
);

export default CardExampleCard;
