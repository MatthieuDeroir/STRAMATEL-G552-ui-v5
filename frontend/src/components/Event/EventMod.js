import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Container from '../utils/drag-drop-sortable-list/Container'




const EventMod = (props) => {

        if (props.eFD) {
            return (
                <div>
                    <DndProvider backend={HTML5Backend}>
                        {/*<Container events={props.eFD}/>*/}
                    </DndProvider>
                </div>
            );

        }
}

export default EventMod;


