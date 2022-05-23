import React, {Component} from "react";
import {Col, Row} from 'react-bootstrap';
import UserService from "../../services/userService";


import FileList from '../File/FileList';
import FileSingle from '../File/FileSingle';
import FileForm from '../File/FileForm';

import EventList from '../Event/EventList';
import EventSingle from '../Event/EventSingle';
import EventForm from '../Event/EventForm';
import EventMod from '../Event/EventMod';

import Example from '../utils/selectableCards'

import axios from "axios";
import authService from "../../services/authService";
import Accordion from "react-bootstrap/Accordion";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            files: [],
            currentFile: [],
            events: [],
            currentEvent: [],
            fileForDisplay: "",
            eventForDisplay: "",
            default: [{
                title: "DEFAULT_IMAGE",
                description: "STRAMATEL DEFAULT"
                //image logo stramatel
            }]
        };

        let genres =
            this.updateCurrentFile = this.updateCurrentFile.bind(this);
        this.updateCurrentEvent = this.updateCurrentEvent.bind(this);
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        let url = 'http://localhost:4000/files'

        axios.get(url)
            .then((Reponse) => {
                this.setState({
                    files: Reponse.data,
                    currentFile: Reponse.data[0], //current file est définie au début de l'execution pour éviter un bug
                    fileForDisplay: JSON.stringify(Reponse.data)
                })
            })
            .catch((error) => {
                console.log(error)
            });


        url = 'http://localhost:4000/events'

        axios.get(url)
            .then((Reponse) => {
                this.setState({
                    events: Reponse.data,
                    currentEvent: Reponse.data[2],
                    eventForDisplay: JSON.stringify(Reponse.data)
                })
            })
            .catch((error) => {
                console.log(error)
            });
        if (this.state.fileForDisplay !== "") {
        }
    }


    //files

    //Update current file
    updateCurrentFile(item) {
        this.setState({
            currentFile: item,
        })
    }

    updateCurrentEvent(item) {
        this.setState({
            currentEvent: item,
        })
    }

    async initDisplayEventJSON(eventJSON) {
        let parsed = [];
        if (eventJSON){
            let stringified = JSON.stringify(eventJSON)
            parsed = JSON.parse(stringified);
            parsed = JSON.parse(parsed);
        }


        const array = [];

        parsed.forEach(function (item) {
            if (item['_user'] == authService.getCurrentUser().username) {
                array.push(item);
            }
        });

        // array.forEach(function (item) {
        //     item['title'] = item['name']
        //     item['description'] = item['path']
        //     delete item['date'];
        //     delete item['__v'];
        //     delete item['_user'];
        //     delete item['name'];
        //     delete item['path']
        // });
        return array
    }


    render() {
        return (
            //
            <div className="container-fluid">
                <Row>
                    <Col>
                        <Accordion>
                            <FileList files={this.state.files}
                                   updateCurrentFile={this.updateCurrentFile}/>
                        <EventList xs={3} event={this.state.events}
                                   updateCurrentEvent={this.updateCurrentEvent}/>
                            </Accordion>
                    </Col>
                    <Col xs={9}><FileSingle file={this.state.currentFile}/></Col>
                </Row>
                <Row>
                    <Col><FileForm file={this.state.selectedFile}/></Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col><EventSingle lg={12} event={this.state.currentEvent}/></Col>
                </Row>
                <Row>
                    <Col><EventForm fFD={this.state.fileForDisplay} default={this.state.default}/></Col>

                </Row>
                <Row>{
                    <Col> <EventMod eFD={this.initDisplayEventJSON(this.state.eventForDisplay)}/> </Col>
                }
                </Row>
            </div>

        );

    }
}