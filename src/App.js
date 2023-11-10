import {BrowserRouter, NavLink, Route, Switch, Routes} from "react-router-dom";
import Home from "./Home"
import Register from "./Register"
import Login from "./Login"
import PremiumContent from "./PremiumContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";

const verifyTokenAPIURL ='https://pu0xnsorsj.execute-api.us-west-2.amazonaws.com/prueba/verify';

function App() {

  const[isAuthenicating, setAuthenicating] = useState(true);

  useEffect(()=>{
    const token = getToken();
    if(token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig ={
      headers:{
      'x-api-key': 'teunRcvUeK2ejZP5OaRMH4nfOpNTHKwL5GYNwM2S'
    }
  }
  const requestBody ={
    user: getUser(),
    token: token
  }

  axios.post(verifyTokenAPIURL, requestBody,requestConfig).then (Response =>{
    setUserSession(Response.data.user, Response.data.token);
    setAuthenicating(false);
  }).catch(() => {
    resetUserSession();
    setAuthenicating(false);
  })
  },[]);

  const token =getToken();
  if(isAuthenicating && token) {
    return <div className="content">autenticando...</div>
  }
  

  return (
    <div  className="App">
      <BrowserRouter>
    <div className="header">
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink exact activeClassName="active" to="/register">Register</NavLink>
    <NavLink exact activeClassName="active" to="/login">Login</NavLink>
    <NavLink exact activeClassName="active" to="/premium-content">Premium Content</NavLink>
    </div> 
    <div className="content">

    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<PublicRoute />} />
  <Route path="/login" element={<PublicRoute />} />
  <Route path="/premium-content" element={<PrivateRoute />} />
</Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}
/*
  se cambio switch por routes en la linea 60 y termina en la 65
*/
export default App;
