import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import Container from '../utils/drag-drop-sortable-list/Container'


const EventMod = (props) => {

        return (
            <div key={props.event._id}>
                <DndProvider backend={HTML5Backend}>
                    <Container event={props.event}/>
                </DndProvider>
            </div>
        );


}

export default EventMod;


