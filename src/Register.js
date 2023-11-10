import React, { useState } from 'react';
import axios from 'axios';
const registerUrl = 'https://pu0xnsorsj.execute-api.us-west-2.amazonaws.com/prueba/register';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messege, setMessege] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
            setMessege('All fields are required');
            return;
        }

        setMessege(null);
        const requestConfig = {
            headers: {
                'x-api-key': 'teunRcvUeK2ejZP5OaRMH4nfOpNTHKwL5GYNwM2S'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }
        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessege('Registeration Successful');
        }).catch(error => {
            if (error.response.status === 401) {
                setMessege(error.response.data.message);
            } else {
                setMessege('sorry...the backend server is down! please try again later')
            }
        })
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /><br />
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /><br />
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /><br />
                password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /><br />
                <input type="submit" value="Register" />
            </form>
            {messege && <p className='messege'>{messege}</p>}
        </div>
    )
}
export default Register;