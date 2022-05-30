import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const FileSingle = (props) => {
    return (

    <Card text={"light"} bg={"dark"} >
        { (() => {
            switch (props.file.type) {
                case "image":
                    return <Card.Img src={`${props.file.path}`} alt="image"/>;
                case "video":
                    return <video src={`${props.file.path}`} autoPlay="1" muted="1" style={{ width: '100%' }} loop/>;
                default:
                    return <p>Invalid Format</p>;
            }
        }) ()}

        <Card.Body>
            <Card.Title>{props.file.name}</Card.Title>
            <Card.Text > Prévisualisation des médias </Card.Text>
            <Button variant="warning">Modifier</Button>
        </Card.Body>
    </Card>
    );
}

export default FileSingle;