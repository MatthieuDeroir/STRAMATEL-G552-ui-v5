import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const FileSingle = (props) => {
    return (
    // <div>
    //     <div className="row">
    //         <div className="col s12">
    //             <div className="card">
    //                 <div className="card-image">
    //                     { (() => {
    //                         switch (props.file.type) {
    //                             case "image":
    //                                 return <img src={`${props.file.path}`} alt="image"/>;
    //                             case "video":
    //                                 return <video src={`${props.file.path}`} autoPlay="1" muted="1" style={{width:"100%"}} loop/>;
    //                             default:
    //                                 return <p>Invalid Format</p>;
    //                         }
    //                     }) ()}
    //                         <span className="card-title">{props.file.name}</span>
    //                 </div>
    //                 <div className="card-content">
    //
    //                 </div>
    //                 <div className="card-action">
    //                     <a href="#">Modifier</a>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <Card text={"light"} bg={"dark"} style={{ width: '90%' }}>
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