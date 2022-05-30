import React from 'react';
import axios from "axios";
import FormData from 'form-data';
import {CircularProgress, Button} from "@mui/material";
import authService from "../../services/authService";

var bcrypt = require("bcryptjs");

class FileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // no file selected to upload
            file: null,
            setFile: null,
            fileName: null,
            setFileName: null,
            user: null,

            hashedFileName: null,
        }
    }

    //Upload file functions
    // File Select
    onFileChange = event => {
        // State update
        this.setState({selectedFile: event.target.files[0]})
    };

    saveFile = (e) => {
        this.setState({file: e.target.files[0]});
        this.setState({fileName: e.target.files[0].name});
        this.setState({fileType: e.target.files[0].type});
        this.setState({user: authService.getCurrentUser().username});
    };
    //File Upload
    onFileUpload = async (e) => {
        e.preventDefault();
        const _name = this.refs.name.value
        const __name = this.state.fileName
        const _hashedName = bcrypt.hashSync(this.state.fileName, 8)
        const _type = this.state.fileType.split('/').shift();
        const _format = this.state.fileType.split('/').pop();
        const __user = this.state.user
        const formData = new FormData();

        formData.append("file", this.state.file);
        formData.append("fileName", _hashedName);
        formData.append("user", this.state.user);
        formData.append("format", _format);
        console.log(__dirname);
        let exception = false;
        try {

            const res = await axios.post(
                "http://localhost:4000/upload",
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
            exception = true;
            return <div> ca marche pas </div>;
        } finally {
            if (!exception) {
                try {
                    const res = await axios.post(
                        'http://localhost:4000/files', {
                            name: _name,
                            type: _type,
                            _user: __user,
                            duration: 5,
                            path: `../medias/${__user}/${_hashedName}.${_format}`,
                        }
                    );
                    console.log(res);
                } catch (ex) {
                    console.log(ex);
                }
                window.location.reload()
            }
        }
    };

    onFileSubmit(e) {
        e.preventDefault();
    }

    render() {

        return (
            <form className="col s12" onSubmit={this.onFileUpload.bind(this)}>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="name" ref="name" type="text"/>
                        <label htmlFor="name">File Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="row">

                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input id="media" ref="media" type="file" onChange={this.saveFile.bind(this)}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="btn-large waves-effect blue-grey darken-4 waves-orange">Add File

                </Button>
            </form>
        );
    }
}

export default FileForm;
