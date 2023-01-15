import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation_links">
      <nav>
        <ul>
          <li>
            <NavLink to="" className="navigation_links_link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="products" className="navigation_links_link">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="profile" className="navigation_links_link">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="about" className="navigation_links_link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
