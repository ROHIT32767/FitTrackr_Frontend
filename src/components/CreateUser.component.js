import React from "react"
import axios from "axios"
export default class CreateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.Submitform = this.Submitform.bind(this)
    }
    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }
    Submitform(event) {
        event.preventDefault();
        const user = {
            username: this.state.username
        }
        axios.post("https://exercise-tracker-backend-jyk5.onrender.com/users/add",user).then(res => console.log(res.data)).catch(err => console.log(err))
        this.setState({username:''})
    }
    render() {
        return (
            <div> <h3> New User</h3>
            <form onSubmit={this.Submitform}>
                <div className="form-group mt-2">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" value={this.state.username} onChange={this.changeUsername} />
                </div>
                <div className="form-group mt-2">
                <input type="submit" className="btn btn-success" value="CreateUserLog" />
                </div>
            </form>
            </div>
        )
    }
}


