import Navigation from "./Navigation";
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Forestfield from '../images/Forestfield.png';

const Header = () => {
    return(
        <header>
            <NavLink to="" className="header_logo"><img src={Forestfield} alt="Forestfield's logo"/></NavLink>
            <div className="header_navbar">
                <Navigation></Navigation>
                <NavLink to="/cart" className="header_cart"><ShoppingCartIcon /></NavLink>
                <p className="header_login">Login</p>
            </div>

        </header>
    )
}

export default Header;