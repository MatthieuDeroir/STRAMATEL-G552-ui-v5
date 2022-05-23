import React from 'react';
import {Collapse, Box,  AccordionSummary, AccordionActions, Button} from '@mui/material'
import {Accordion} from 'react-bootstrap'
import userService from "../../services/userService";
import AuthService from "../../services/authService";
import { Row } from 'react-bootstrap'

const FileList = (props) => {
    return (
        <div>
            <Accordion.Item eventKey="1" >
                <Accordion.Header>Files</Accordion.Header>
                <Accordion.Body >

            {props.files.map((item) => {
                    if (AuthService.getCurrentUser()){
                        if (item._user == AuthService.getCurrentUser().username) {
                            return <Button href="#!" key={item._id} disableSpacing={true}
                                                  onClick={props.updateCurrentFile.bind(this, item)}
                                  size={"small"} variant="text">{item.name}</Button>
                        }
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>


</div>);
}

export default FileList;