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

            //template
            // JSONtemplate: {[
            //
            //         ]
            // }

            //triggers
            //creation
            importFile: false,
            importEvent: false,

            //selection
            isFileSelected: false,
            isEventSelected: false,

            //modification
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,

            //display lists
            displayFileList: props.displayFileList,
            displayEventList: props.displayEventList,

            default: [{
                title: "DEFAULT_IMAGE",
                description: "STRAMATEL DEFAULT"
                //image logo stramatel
            }]
        };

        //triggers
        //importation
        this.importFile = this.importFile.bind(this);
        this.importEvent = this.importEvent.bind(this);
        //selection
        this.updateCurrentFile = this.updateCurrentFile.bind(this);
        this.updateCurrentEvent = this.updateCurrentEvent.bind(this);

        //modification
        this.modifyCurrentEvent = this.modifyCurrentEvent.bind(this);
        this.modifyCurrentFile = this.modifyCurrentFile.bind(this);

        //deletion
        this.deleteCurrentEvent = this.deleteCurrentEvent.bind(this);
        this.deleteCurrentFile = this.deleteCurrentFile.bind(this);

        //display event
        this.displayEvent = this.displayEvent.bind(this);
        this.convertToJSON = this.convertToJSON.bind(this);

        //display lists
        this.displayFileList = this.displayFileList.bind(this)
        this.displayEventList = this.displayEventList.bind(this)
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
                    eventForDisplay: Reponse.data

                })

            })
            .catch((error) => {
                console.log(error)
            });
    }


    //files
    importFile() {
        this.setState({
            importFile: true,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
        })
    }

    //Update current file
    updateCurrentFile(item) {
        this.setState({
            currentFile: item,
            importFile: false,
            importEvent: false,
            isFileSelected: true,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,

        })
    }

    modifyCurrentFile(item) {
        this.setState({
            currentFile: item,
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isFileSelectedForModification: true,
            isEventSelectedForModification: false,
        })
    }

    deleteCurrentFile(item) {
        this.setState({
            currentFile: item,
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
        })
    }

    displayFileList() {
        this.setState({
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
            displayFileList: true,
            displayEventList: false,
        })
    }

    //event
    importEvent() {
        this.setState({
            importFile: false,
            importEvent: true,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
        })
    }

    updateCurrentEvent(item) {
        this.setState({
            currentEvent: item,
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: true,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
        })
    }

    modifyCurrentEvent(item) {
        this.setState({
            isEventSelectedForModification: false,
        })
        this.m(item)
    }

    m(item) {
        this.setState({
            currentEvent: item,
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: true,
            isFileSelectedForModification: false,
        })
    }

    deleteCurrentEvent(item) {
        this.setState({
            currentEvent: item,
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
        })

        axios.delete("http://localhost:4000/event/" + item._id)
        window.location.reload()
    }

    displayEventList() {
        this.setState({
            importFile: false,
            importEvent: false,
            isFileSelected: false,
            isEventSelected: false,
            isEventSelectedForModification: false,
            isFileSelectedForModification: false,
            displayFileList: false,
            displayEventList: true,
        })
    }

    convertToJSON(item) {
        console.log(item)
    }

    displayEvent(item) {
        this.convertToJSON(item);
    }


    initDisplayEventJSON(eventJSON) {
        let parsed = [];


        if (eventJSON) {
            let stringified = JSON.stringify(eventJSON)
            parsed = JSON.parse(stringified);
        }
        const array = [];

        parsed.forEach(function (item) {
            if (item['_user'] === authService.getCurrentUser().username) {
                array.push(item);
            }
        });
        return array
    }


    render() {
        return (
            //
            <div className="container-fluid position-relative">
                <Row className={"container-fluid"}>
                    <Col>

                            <FileList files={this.state.files}
                                      updateCurrentFile={this.updateCurrentFile}
                                      modifyCurrentFile={this.modifyCurrentFile}
                                      deleteCurrentFile={this.deleteCurrentFile}
                                      importFile={this.importFile}
                            />
                            <EventList event={this.state.events}
                                       updateCurrentEvent={this.updateCurrentEvent}
                                       modifyCurrentEvent={this.modifyCurrentEvent}
                                       deleteCurrentEvent={this.deleteCurrentEvent}
                                       importEvent={this.importEvent}
                                       displayEvent={this.displayEvent}
                            />

                    </Col>
                        {/*</Col>*/}
                        <Col lg={7} className={"m1"}>
                            {this.state.isFileSelected ?
                                <Col>
                                    <FileSingle file={this.state.currentFile}/>
                                </Col>
                                : null}
                            {this.state.isEventSelectedForModification ?
                                <Col> <EventMod event={this.state.currentEvent}/> </Col>
                                : null}
                            {this.state.importEvent ?
                                <Col><EventForm fFD={this.state.fileForDisplay} default={this.state.default}/></Col>
                                : null}
                            {this.state.isEventSelected ?
                                <Col style={{width: "100vh"}}><EventSingle event={this.state.currentEvent}/></Col>

                                : null}
                            {this.state.importFile ?
                                <Col><FileForm file={this.state.selectedFile}/></Col>
                                : null}
                        </Col>
                </Row>
            </div>

    );

    }
    }