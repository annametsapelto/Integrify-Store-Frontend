import { NavLink, BrowserRouter } from 'react-router-dom'

const Navigation = () => {
    return (
        <div>
                <nav>
                    <ul>
                        <li><NavLink to="">Home</NavLink></li>
                        <li><NavLink to="products">Products</NavLink></li>
                        <li><NavLink to="profile">Profile</NavLink></li>
                        <li><NavLink to="about">About</NavLink></li>
                    </ul>
                </nav>
        </div>
    )
}

export default Navigation;