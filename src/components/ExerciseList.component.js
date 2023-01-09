import React, { Component } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';
import {VscEdit,VscTrash} from "react-icons/vsc";
function ExerciseComponent(props) {
    return (
        <tr>
            <td className="table-primary">{props.username}</td>
            <td className="table-primary">{props.description}</td>
            <td className="table-primary">{props.duration}</td>
            <td className="table-primary">{props.date.substring(0,10)}</td>
            <td colSpan={2} className="table-primary">
              <span><Link to={`/edit/${props.id}`} className="nav-link"> <VscEdit /></Link></span>  <span><a href="/" onClick={(() => { props.exercisedelete(props.id) })}><VscTrash /></a></span> 
            </td>
        </tr>
    )
}
export default class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.exercisedelete = this.exercisedelete.bind(this)
    }
    componentDidMount() {
        axios.get('https://exercise-tracker-backend-jyk5.onrender.com/exercises')
            .then(res => {
                const persons = res.data;
                if (persons.length > 0) {
                    this.setState({
                        exercises: persons
                    })
                }
            }
        ).catch(error => console.log(error))
    }
    exercisedelete(id) {
        axios.delete(`https://exercise-tracker-backend-jyk5.onrender.com/exercises/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.setState(this.state.exercises.filter(element => element._id !== id))
    }
    exerciseList() {
        return this.state.exercises.map(element => {
            return <ExerciseComponent
                username={element.username}
                duration={element.duration}
                date={element.date}
                description={element.description}
                key={element._id}
                id={element._id}
                exercisedelete={this.exercisedelete}
            />
        })
    }
    render() {
        return (
            <div>
                <h3> Logged Exercises</h3>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Date</th>
                            <th scope="col">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>

        )
    }
}