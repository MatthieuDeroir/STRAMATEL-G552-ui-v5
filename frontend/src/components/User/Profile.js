import React, { Component } from "react";
import AuthService from "../../services/authService";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    render() {
        const { currentUser } = this.state;
        return (
            <div className="container" >
                <header className="jumbotron">
                    <h3 style={{color:"white"}}>
                        <strong >{currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p style={{color:"white"}}>
                    <strong >Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p style={{color:"white"}}>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                </p>
                <strong style={{color:"white"}} >Authorities:</strong>
                <ul style={{color:"white"}}>
                    {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}