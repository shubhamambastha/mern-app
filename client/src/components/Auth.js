import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from '../store/actions';

class Auth extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        const {email, password} = this.state;
        const {authType} = this.props;
        console.log("here auth type",authType)
        e.preventDefault();
        this.props.authUser(authType || 'login', {email, password}); //default login
    }

    render(){
        return(
            <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter Email"
                    onChange={(e)=>{this.handleChange(e)}}
                />
                <label>Password</label>
                <input 
                    type="password"
                    name="password" 
                    value={this.state.password}
                    placeholder="Enter Password"
                    onChange={(e)=>{this.handleChange(e)}}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default connect(()=>({}),{authUser, logout})(Auth);