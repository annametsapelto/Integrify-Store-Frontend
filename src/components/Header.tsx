import Navigation from "./Navigation";
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Forestfield from '../images/Forestfield.png';

const Header = () => {
    return(
        <div>
            <NavLink to=""><img src={Forestfield} alt="Forestfield's logo"/></NavLink>
            <Navigation></Navigation>
            <p>Login</p>
            <p>Register</p>
            <NavLink to="/cart"><ShoppingCartIcon /></NavLink>
        </div>
    )
}

export default Header;