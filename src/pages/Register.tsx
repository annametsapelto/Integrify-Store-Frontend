import { useState } from 'react';

import { Input, InputLabel } from '@mui/material';
import { RegisterType } from '../types/RegisterType';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return(
        <div className='register'>
            <h1>Register here</h1>
            <form>
                <InputLabel htmlFor='username'>Your username</InputLabel>
                <Input id="username" name="username" type="string" required value={username} onChange={(event) => setUsername(event.target.value)}></Input>
                <InputLabel htmlFor='userEmail'>Your email</InputLabel>
                <Input type="email" id="userEmail" name="userEmail" required value={email} onChange={(event) => setEmail(event.target.value)}></Input>
                <InputLabel htmlFor='userPassword'>Your password</InputLabel>
                <Input type='string' id='userPassword' name='userPassword' required value={password} onChange={(event) => setPassword(event.target.value)}></Input>
                <button onSubmit={(event) => handleSubmit(event)}>Register</button>
            </form>
        </div>
    )
}

export default Register;