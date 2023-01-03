import { useState } from "react";
import Navigation from "./Navigation";
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Forestfield from '../images/Forestfield.png';
import { Modal, InputLabel, TextField, Box } from '@mui/material';


const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
 
    return(
        <header>
            <NavLink to="" className="header_logo"><img src={Forestfield} alt="Forestfield's logo"/></NavLink>
            <div className="header_navbar">
                <Navigation></Navigation>
                <NavLink to="/cart" className="header_cart"><ShoppingCartIcon /></NavLink>
                <p className="header_login" onClick={() =>setOpenModal(!openModal)}>Login</p>
                <Modal open={openModal} onClose={handleClose}>
                    <Box>
                        <form>
                            <InputLabel htmlFor="username">Your username</InputLabel>
                            <TextField type="string" value={userName} id="username" onChange={(event) => setUserName(event.target.value)}></TextField>
                            <InputLabel htmlFor="password">Your password</InputLabel>
                            <TextField type="string" value={password} id="password" onChange={(event) => setPassword(event.target.value)}></TextField>
                            <button>Login</button>
                        </form>
                        <p>Are you not registered yet?</p>
                        <button onClick={() => handleClose()}><NavLink to="register">Register</NavLink></button>
                    </Box>
                </Modal>
            </div>

        </header>
    )
}

export default Header;