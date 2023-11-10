import React, { Component } from "react";
import{Navigate,Route} from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PrivateRoute =({ component: Component, ...rest})=>{
    return(
        <Route
        {...rest}
        render={props => {
            return getToken() ? <Component {...props}/>
            : <Navigate to={{pathname: '/login'}}/>
        }}
        />
    )
}
/*
  se cambio redirect por Navigate en la linea 11 
*/
export default PrivateRoute;