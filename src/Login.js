import axios from 'axios';
import React, {useState} from 'react';
import { setUserSession } from './service/AuthService';

const loginAPIUrl = 'https://pu0xnsorsj.execute-api.us-west-2.amazonaws.com/prueba/login';

const Login =(props)=> {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage,setErrorMessage] =useState(null);

const submitHandler =(event)=>{
    event.preventDefault();
   if (username.trim() === '' || password.trim()=== ''){
    setErrorMessage('Both isername and apassword are required');
return;
}

setErrorMessage(null);
const requestConfig = {
    headers: {
        'x-api-key': 'teunRcvUeK2ejZP5OaRMH4nfOpNTHKwL5GYNwM2S'
    }
}

const requestBody ={
    username:username,
    password:password
}

axios.post(loginAPIUrl,requestBody,requestConfig).then((response)=>{
 setUserSession(response.data.user, response.data.token);
 props.history.push('/premium-content');
}).catch((error)=> {
    if(error.response.status === 401 || error.response.status ===403){
        setErrorMessage(error.response.data.message);
    }else{
        setErrorMessage('lo siento el servidor dejo de funcionar');
    }
})

}
    return (
        <div>
            <form onSubmit={submitHandler}>
            <h5>Login</h5>
            username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/><br/>
            password: <input type="text" value={password} onChange={event => setPassword(event.target.value)}/><br/>
            <input type="submit" value="Login" />
          </form>
          {errorMessage && <p className='messege'>{setErrorMessage }</p>}
        </div>
       
    )
}
export default Login;