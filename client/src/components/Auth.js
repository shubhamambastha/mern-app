import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from '../store/actions';

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit (e) {
        const { email, password } = this.state;
        const { authType } = this.props;
        console.log("here auth type", authType)
        e.preventDefault();
        this.props.authUser(authType || 'login', { email, password }); //default login
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter Email"
                    className="form-input"
                    onChange={this.handleChange}
                />
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter Password"
                    className="form-input"
                    onChange={this.handleChange}
                />
                <div className="buttons_center">
                    <button className="button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

export default connect(() => ({}), { authUser, logout })(Auth);