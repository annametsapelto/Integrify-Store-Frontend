import { useState } from "react";
import Navigation from "./Navigation";
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Forestfield from '../images/Forestfield.png';
import { Modal, InputLabel, TextField, Box, Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { UserLogin } from "../redux/reducers/userReducer";


const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const user = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = () => {
        const login = async () => {
            await dispatch(UserLogin({email: email, password: password}))
            .then((response) => {
                console.log("logged in");
                if ("error" in response) {
                    setMessage("Error! Your email or password are not correct.");
                    setOpen(true);
                }
                navigate("/");
            })
        }
        login();
    }
    const handleClose = () => setOpenModal(false); 
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
        <header>
            <NavLink to="" className="header_logo"><img src={Forestfield} alt="Forestfield's logo"/></NavLink>
            <div className="header_navbar">
                <Navigation></Navigation>
                <NavLink to="/cart" className="header_cart"><ShoppingCartIcon /></NavLink>
                <p className="header_login" onClick={() =>setOpenModal(!openModal)}>Login</p>
                <Modal open={openModal} onClose={handleClose}>
                    <Box sx={boxStyle}>
                        <form className="login_form">
                            <InputLabel htmlFor="email">Your email</InputLabel>
                            <TextField type="string" value={email} id="email" onChange={(event) => setEmail(event.target.value)}></TextField>
                            <InputLabel htmlFor="password">Your password</InputLabel>
                            <TextField type="string" value={password} id="password" onChange={(event) => setPassword(event.target.value)}></TextField>
                            <button onClick={() => loginHandler()}>Login</button>
                        </form>
                        <div className="login_register">
                            <p>Are you not registered yet?</p>
                            <button onClick={() => handleClose()}><NavLink to="register" className="login_link">Register</NavLink></button>
                        </div>
                        
                    </Box>
                </Modal>
            </div>

        </header>
    )
}

export default Header;