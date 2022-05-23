import React from 'react';
import AuthService from "../../services/authService";
// import {Accordion, AccordionActions, AccordionSummary, Button} from "@mui/material";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button"

const EventList = (props) => {

    return (
    // <div>
    //     <ul className="collection with-header">
    //         <li className="collection-header"><h4>Events</h4></li>
    //         {props.event.map((item) => {
    //             if (item._user === AuthService.getCurrentUser().username) {
    //                 return <a href="#!" className="collection-item" key={item._id}
    //                           onClick={props.updateCurrentEvent.bind(this, item)}>
    //                     {item.name}
    //                 </a>;
    //             }
    //         })}
    //     </ul>
    // </div>);

    <div>
        {/*<Accordion>*/}
        {/*    <AccordionSummary>Event</AccordionSummary>*/}
        {/*    {props.event.map((item) => {*/}
        {/*        if (AuthService.getCurrentUser()){*/}
        {/*            if (item._user == AuthService.getCurrentUser().username) {*/}
        {/*                return <AccordionActions href="#!" key={item._id} disableSpacing={true}*/}
        {/*                                         onClick={props.updateCurrentEvent.bind(this, item)} >*/}
        {/*                    <Button variant="text">{item.name}</Button>*/}
        {/*                </AccordionActions>;*/}
        {/*            }*/}
        {/*        }*/}
        {/*    })}*/}
        {/*</Accordion>*/}


            <Accordion.Item eventKey="0" >
                <Accordion.Header>Events</Accordion.Header>
                <Accordion.Body >
                    {props.event.map((item) => {
                        if (AuthService.getCurrentUser()){
                            if (item._user == AuthService.getCurrentUser().username) {
                                return  <div className="row scrolling" ><Button
                                    variant="outline-dark"
                                    href="#!" key={item._id} disableSpacing={true}
                                                         onClick={props.updateCurrentEvent.bind(this, item)} style={{width:"20%", height:"80%"}} >
                                   {item.name}</Button></div>;
                            }
                        }
                    })}
                </Accordion.Body>
            </Accordion.Item>

    </div>

    );


}

export default EventList;