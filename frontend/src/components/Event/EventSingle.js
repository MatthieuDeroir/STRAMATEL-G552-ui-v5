import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'





const EventSingle = (props) => {
    if (props.event.files) {
        return (
            <div>
                <h2 style={{textAlign:"center"}}> {props.event.name}</h2>
                <Carousel fade key={`${props.event._id}`} lg={{width: "624px", height:"350px"}} >
                    {
                        props.event.files.map((item) => //dans l'idéal, height est dépendante = width/(screen_res)
                                                        //screen_res étant la résolution du panneau
                                                        //pour prévisualisation réaliste des médias
                            <Carousel.Item interval={item.duration} lg={{width: "624px", height:"350px"}}>
                                    {(() => {
                                        switch (item.type) {
                                            case "image":
                                                return <img className="d-block w-100 h-100" src={`${item.path}`} alt="image"/>;
                                            case "video":
                                                return <video className="d-block w-100 h-100"
                                                src={`${item.path}`} autoPlay="1" muted="1" loop/>;
                                            default:
                                                return <p>Invalid Format</p>;
                                        }
                                    })()}
                                <Carousel.Caption>

                                   <h3> {item.name}</h3>
                                </Carousel.Caption>

                            </Carousel.Item>
                        )
                    }
                </Carousel>
            </div>
        );
    }
}

export default EventSingle;