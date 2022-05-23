import React from 'react';
import axios from "axios";

import './App.css';

import '../bootstrap/css/bootstrap.min.css'

import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../services/authService";
import Login from "./User/Action/Login";
import Registration from "./User/Action/Registration";
import Home from "./User/Home"
import Profile from "./User/Profile"
import BoardUser from "./User/View/UserBoard"
import BoardAdmin from "./User/View/AdminBoard"
import BoardSuperuser from "./User/View/SuperuserBoard"

import FileList from './File/FileList';
import FileSingle from './File/FileSingle';
import FileForm from './File/FileForm';

import EventList from './Event/EventList';
import EventSingle from './Event/EventSingle';
import EventForm from './Event/EventForm';


/*
couleurs STRAMATEL :

GRIS : #31434f
BORDEAU : #982d23
ROUGE : #c93028
ORANGE : #fb6a22
JAUNE : #fe9b19


 */


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //user
            showAdminBoard: false,
            showSuperuserBoard: false,
            currentUser: undefined,
            //files
            // files: [],
            // currentFile: [],
            // events: [],
            // currentEvent: [],
            // connected: true,

        }
        //users
        this.logOut = this.logOut.bind(this);
        //files
        // this.updateCurrentFile = this.updateCurrentFile.bind(this);
        // this.updateCurrentEvent = this.updateCurrentEvent.bind(this);
    }

    componentDidMount() {
//users
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                showSuperuserBoard: user.roles.includes("ROLE_SUPERUSER")
            });
        }

//files
        let url = 'http://localhost:4000/files'

        axios.get(url)
            .then((Reponse) => {
                this.setState({
                    files: Reponse.data,
                    currentFile: Reponse.data[0]
                })
            })
            .catch((error) => {
                console.log(error)
            });

        url = 'http://localhost:4000/events'

        axios.get(url)
            .then((Reponse) => {
                this.setState({
                    events: Reponse.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }


    componentWillUnmount() {
    }

    //user
    logOut(){
        AuthService.logout();
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


    render() {
        const { currentUser, showSuperuserBoard, showAdminBoard } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        <img src="../../public/assets/img/STRAMATEL-LOGO.png" alt=""/>
                    </Link>
                    {currentUser != undefined ? (
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                    </div>
                    ) : null}
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href={"/login"} className="nav-link" onClick={this.logOut}>
                                    Log Out
                                </a>
                            </li>
                        </div>
                     ):(
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Log In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                        )}
                </nav>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Registration} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/superuser" component={BoardSuperuser} />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default App;

