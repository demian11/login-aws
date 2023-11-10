import React from "react";
import { getUser, resetUserSession } from "./service/AuthService";

const PremiumContent = (props)  => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';

    const logoutHandler = () =>{
        resetUserSession();
        props.history.push('/login');
    }



    return (
        <div>
            Hola {name}, haz iniciado sesion, esta es la pagina premium
            <input type="button" value="/Logiut" onClick={logoutHandler}/>
        </div>
    )
}
export default PremiumContent;