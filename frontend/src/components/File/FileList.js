import React from 'react';
import { ImageList, ImageListItem} from '@mui/material'
import {Accordion, Button} from 'react-bootstrap'
import userService from "../../services/userService";
import AuthService from "../../services/authService";
import {Row, Col} from 'react-bootstrap'


const FileList = (props) => {
    return (
        <div>
            <Accordion >
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Files</Accordion.Header>
                    <Accordion.Body style={{width: "100%", maxHeight: "32vh", overflowY: "scroll", justifyContent:"center" , backgroundColor: "#31434f"}}>
                        <Row>
                                <Button variant="outline-light" href="#!" key={1} disableSpacing={true}
                                        onClick={props.importFile.bind(this)}
                                        size={"small"} style={{width: "95%", height: "90%"}} >Importer un media</Button>
                        </Row>

                        {props.files.map((item) => {
                            if (AuthService.getCurrentUser()) {
                                if (item._user === AuthService.getCurrentUser().username) {
                                    return <Row>
                                        <Button variant="outline-dark" href="#!" key={item._id+1} disableSpacing={true}
                                                onClick={props.updateCurrentFile.bind(this, item)}
                                                size={"small"}style={{width: "95%", height: "90%"}} >{item.name}</Button>
                                    </Row>

                                }
                            }
                        })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ImageList
                sx={{ width: 500, height: 450 }}
                variant="quilted"
                cols={3}
                rowHeight={121}
                style={{backgroundColor:"#203038"}}
            >
                {props.files.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 0} rows={item.rows || 0}>
                        {
                            item.type === "image" ?
                                <Button  variant="dark"
                                         href="#!" key={item._id+1}
                                        onClick={props.updateCurrentFile.bind(this, item)}>
                                    <img
                                    src={item.path}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{width:"120px", height: "67px"}}
                                /></Button>


                        :
                                <Button variant="dark"
                                    href="#!" key={item._id+1}
                                        onClick={props.updateCurrentFile.bind(this, item)}>
                                <video
                                    src={item.path}
                                    style={{width:"120px", height: "67px"}}
                                /></Button>
                        }

                    </ImageListItem>
                ))}
            </ImageList>


        </div>);
}

export default FileList;