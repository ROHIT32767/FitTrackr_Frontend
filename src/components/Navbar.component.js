import React from "react"
import { Link } from 'react-router-dom';
import {TfiAndroid} from "react-icons/tfi";;
export default class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
                <TfiAndroid />
                <Link to="/" className="nav-link text-warning"> ExerciseTracker</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active mr-2">
                                <Link to="/" className="nav-link text-light"> Exercises</Link>
                            </li>
                            <li className="nav-item mr-2">
                                <Link to="/Create" className="nav-link text-light">CreateExerciseLog</Link>
                            </li>
                            <li className="nav-item mr-2">
                                <Link to="/User" className="nav-link text-light">CreateUserLog</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}