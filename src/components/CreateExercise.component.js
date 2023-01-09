import React from "react"
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default class CreateExercise extends React.Component {
    constructor(props) {
        super(props)
        this.changeUsername = this.changeUsername.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeDuration = this.changeDuration.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.SubmitForm = this.SubmitForm.bind(this)
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    componentDidMount() {
        axios.get('https://exercise-tracker-backend-jyk5.onrender.com/users/')
            .then(response => {
                const persons = response.data
                if (persons.length > 0) {
                    this.setState({
                        users: persons.map(person => person.username),
                        username: persons[0].username
                    })
                }
            }
            ).catch(err => console.log(err))
    }

    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    changeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    changeDuration(event) {
        this.setState({
            duration: event.target.value
        })
    }

    changeDate(date) {
        this.setState({
            date: date
        })
    }

    SubmitForm(event) {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise)
        axios.post('https://exercise-tracker-backend-jyk5.onrender.com/exercises/add',exercise).then(res => {
            console.log(res.data)
            // window.location = "/"
        }).catch(err => console.log(err))
        
    }

    render() {
        return (
            <div>
                <h3> New Exercise</h3>
                <form onSubmit={this.SubmitForm}>
                <div className="form-group mt-2">
                    <label>Select Username</label>
                    <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.changeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option key={user} value={user}>{user}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Description</label>
                    <input type="text" className="form-control" placeholder="Description of Exercise" value={this.state.description} onChange={this.changeDescription} />
                </div>
                <div className="form-group mt-2">
                    <label>Duration</label>
                    <input  type="text" className="form-control"  
                    placeholder="Duration of Exercise"
                    value={this.state.duration}
                    onChange={this.changeDuration}
                       />
                </div>
                <div className="form-group mt-2">
                    <label>Date</label>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.changeDate}
                    />
                </div>
                <div className="form-group mt-2">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
            </div> 
        )
    }
}
