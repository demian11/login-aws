import React, { Component } from "react";
import{Navigate,Routes} from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PublicRoute = ({ component: Component, ...rest}) => {
    return(
        <Routes
        {...rest}
        render={props => {
            return !getToken() ? <Component {...props}/>
            : <Navigate to={{pathname: '/premium-content'}}/>
        }}
        />
    )
}
export default PublicRoute;