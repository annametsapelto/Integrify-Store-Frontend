import { useState, useEffect } from 'react';

import { Input, InputLabel, Alert, Snackbar, Box } from '@mui/material';
import { RegisterType } from '../types/RegisterType';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { createUser } from '../redux/reducers/userReducer';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [msgStatus, setmsgStatus] = useState<"error" | "success">("success");
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.userReducer);

    const createAccount = () => {
        if (password.length < 5) {
            setMessage("Password is too short!");
            setmsgStatus("error");
            setOpen(true);
          } else {
            dispatch(
              createUser({
                email: email,
                password: password,
                name: username,
                avatar: ("https://picsum.photos/200"),
              })
            ).then((res) => {
              if ("error" in res) {
                setMessage("Data entered is invalid!");
                setmsgStatus("error");
                setOpen(true);
              }
              navigate("/");
            });
          }
    }

    useEffect(() => {
        if (user.name !== "Guest") {
            setIsRegistered(true);
        }
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return(
        <div className='register'>
            {!isRegistered ?
            <div>
                <h1>Register here</h1>
                <form>
                    <InputLabel htmlFor='username'>Your username</InputLabel>
                    <Input id="username" name="username" type="string" required value={username} onChange={(event) => setUsername(event.target.value)}></Input>
                    <InputLabel htmlFor='userEmail'>Your email</InputLabel>
                    <Input type="email" id="userEmail" name="userEmail" required value={email} onChange={(event) => setEmail(event.target.value)}></Input>
                    <InputLabel htmlFor='userPassword'>Your password</InputLabel>
                    <Input type='string' id='userPassword' name='userPassword' required value={password} onChange={(event) => setPassword(event.target.value)}></Input>
                    <Box>
                        <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}>                  
                        <Alert
                            onClose={() => setOpen(false)}
                            severity={msgStatus}
                            sx={{ width: "100%" }}>
                            {message}
                        </Alert>
                        </Snackbar>
                    </Box>

                    <button onSubmit={(event) => handleSubmit(event)}>Register</button>
                </form>
            </div>
            :
            <div>
                <h1>You are already registered</h1>
                <Link to="/">Return to home page.</Link>
            </div>
            }
        </div>
    )
}

export default Register;