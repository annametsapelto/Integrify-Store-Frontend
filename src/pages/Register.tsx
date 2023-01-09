import { useState, useEffect } from 'react';

import { Input, InputLabel, Alert, Snackbar, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { createUser } from '../redux/reducers/userReducer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateUserType } from '../types/UserType';
import { register } from 'ts-node';
import { registration } from '../validation/registration';
import { yupResolver } from '@hookform/resolvers/yup';

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [msgStatus, setmsgStatus] = useState<"error" | "success">("success");
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.userReducer);
    const {handleSubmit, register, watch, formState: {errors}} = useForm<CreateUserType>({
        resolver: yupResolver(registration)
    });

    const onSubmit: SubmitHandler<CreateUserType> = (data) => {
            console.log(data);
        }

    const boxStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return(
        <div className='register'>
            {!isRegistered ?
            <div>
                <h1>Register here</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel htmlFor='username'>Your username</InputLabel>
                    <Input id="username" {...register("name")} type="string"></Input>
                    <p>{errors.name?.message}</p>
                    <InputLabel htmlFor='userEmail'>Your email</InputLabel>
                    <Input type="email" id="userEmail" {...register("email")}></Input>
                    <p>{errors.email?.message}</p>
                    <InputLabel htmlFor='userPassword'>Your password</InputLabel>
                    <Input type='password' id='userPassword' {...register("password")}></Input>
                    <p>{errors.password?.message}</p>
                    <InputLabel htmlFor='userPassword'>Enter password again</InputLabel>
                    <Input type='password' id='userPassword2' {...register("password2")}></Input>
                    <p>{errors.password2?.message}</p>
                    <button type="submit">Register</button>
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