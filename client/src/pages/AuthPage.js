import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../components/Auth";
import ErrorMsg from "../components/ErrorMsg";


const AuthPage =({authType, isAuthenticated})=>{

    if(isAuthenticated){
        return(
            <Redirect to='/' />
        )
    }

    return(
        <div>
            <ErrorMsg />
            <Auth authType={authType} />
        </div>
    )
}

export default AuthPage