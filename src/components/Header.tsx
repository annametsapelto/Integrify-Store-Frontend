import Navigation from "./Navigation";
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
    return(
        <div>
            <p>Logo</p>
            <Navigation></Navigation>
            <p>Login</p>
            <p>Register</p>
            <NavLink to="/cart"><ShoppingCartIcon /></NavLink>
        </div>
    )
}

export default Header;