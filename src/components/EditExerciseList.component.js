import React, { Component } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class EditExerciseList extends Component {
  constructor(props) {
    super(props);
    this.ChangeUsername = this.ChangeUsername.bind(this);
    this.ChangeDescription = this.ChangeDescription.bind(this);
    this.ChangeDuration = this.ChangeDuration.bind(this);
    this.ChangeDate = this.ChangeDate.bind(this);
    this.Submit = this.Submit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://exercise-tracker-backend-jyk5.onrender.com/exercises/'+this.props.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://exercise-tracker-backend-jyk5.onrender.com/users/')
      .then(response => {
        const persons = response.data
        if (persons.length > 0) {
          this.setState({
            users: persons.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  ChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  ChangeDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  ChangeDuration(event) {
    this.setState({
      duration: event.target.value
    })
  }

  ChangeDate(Date) {
    this.setState({
      date: Date
    })
  }

  Submit(event) {
    event.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }
    console.log(exercise);
    axios.post(`https://exercise-tracker-backend-jyk5.onrender.com/update/${this.props.params.id}`, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.Submit}>
        <div className="form-group mt-2"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.ChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group mt-2"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.ChangeDescription}
              />
        </div>
        <div className="form-group mt-2">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.ChangeDuration}
              />
        </div>
        <div className="form-group mt-2">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.ChangeDate}
            />
          </div>
        </div>

        <div className="form-group mt-4">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}

export default withParams(EditExerciseList)