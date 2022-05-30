import React from 'react';
import AuthService from "../../services/authService";
// import {Accordion, AccordionActions, AccordionSummary, Button} from "@mui/material";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button"
import {Col, Row} from 'react-bootstrap';


const EventList = (props) => {

    return (

        <div>
            <Accordion.Item eventKey="0">
                <Accordion.Header style={{backgroundColor: "#31434f"}}>Events</Accordion.Header>
                <Accordion.Body
                    style={{width: "100%", height: "100%", overflowY: "scroll", backgroundColor: "#31434f"}}>
                    <div style={{width: "100%", maxHeight: "68vh", height: "auto", overflowY: "scroll"}}>
                        <Row>
                            <Col>
                                <Button
                                    variant="outline-light"
                                    href="#!" key={0} disableSpacing={true}
                                    onClick={props.importEvent.bind(this)} style={{width: "99%", height: "90%"}}>
                                    Créer un évenement
                                </Button>
                            </Col>
                        </Row>


                        {props.event.map((item) => {
                            if (AuthService.getCurrentUser()) {
                                if (item._user == AuthService.getCurrentUser().username) {
                                    return <Row className="flex-row justify-content-center">
                                        <Col >
                                            <Button
                                                variant="dark"
                                                href="#!" key={item._id + 1} disableSpacing={true}
                                                onClick={props.updateCurrentEvent.bind(this, item)}
                                                style={{width: "95%", height: "95%", backgroundColor: "#982d23"}}>
                                                {item.name}
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="dark"
                                                href="#!" key={item._id + 3} disableSpacing={true}
                                                onClick={props.deleteCurrentEvent.bind(this, item)}
                                                style={{width: "95%", height: "95%", backgroundColor: "#c93028"}}>
                                                Supprimer
                                            </Button>
                                        </Col>
                                        <Col >
                                            <Button
                                                // GRIS : #31434f
                                                // BORDEAU : #982d23
                                                // ROUGE : #c93028
                                                // ORANGE : #fb6a22
                                                // JAUNE : #fe9b19
                                                variant="dark"
                                                href="#!" key={item._id + 2} disableSpacing={true}
                                                onClick={props.modifyCurrentEvent.bind(this, item)}
                                                style={{width: "95%", height: "95%", backgroundColor: "#fb6a22"}}>
                                                Modifier
                                            </Button>
                                        </Col>
                                        <Col >
                                            <Button
                                                variant="dark"
                                                href="#!" key={item._id + 4} disableSpacing={true}
                                                onClick={props.displayEvent.bind(this, item)}
                                                style={{width: "95%", height: "95%", backgroundColor: "#fe9b19"}}>
                                                Afficher
                                            </Button>
                                        </Col>
                                        {/*<Button variant={"light"} href="#!" key={0} disableSpacing={true}*/}
                                        {/*        onClick={props.importFile.bind(this)}*/}
                                        {/*        size={"small"} variant="text">Importer un media</Button>*/}
                                    </Row>;
                                }
                            }
                        })}
                    </div>


                </Accordion.Body>
            </Accordion.Item>

        </div>

    );


}

export default EventList;