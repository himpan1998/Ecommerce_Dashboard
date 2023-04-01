import React from "react";
import { Link, useNavigate } from "react-router-dom"
const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div>
            <img
            alt="logo"
            className="logo"
            src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png"/>
            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update/:id"> Update Product</Link></li>
                    <li><Link to="/profile"> Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout [{JSON.parse(auth).name}]</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}


export default Nav;
