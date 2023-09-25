import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import './navbar.css';
import { CgMenu } from "react-icons/cg";
import pic1 from "../img/LOGO.jpg"
import { useAuth } from '../../Context/Auth'

const Navbar = () => {

    // const [menuIcon, setMenuIcon] = useState(false);
    const auth = useAuth();
    const [showLinks, setShowLinks] = useState(false);

    // console.log(auth);
    const Rendermenu = () => {
        // console.log(auth.user);
        if (auth.user) {
            return (<>
                <div className="navbar">
                    <div className="left-side">
                        <div className="Logo"></div>
                        <NavLink to="/">
                            <img src={pic1} className="logo" alt="logo"></img>
                        </NavLink>
                    </div>
                    <div className="right-side">
                        <div className="links" id={showLinks ? "hidden" : ""}>
                            <NavLink to="/foodZone" className="navbar-link ">Food-Zone</NavLink>
                            {/* <NavLink to="/login" className="navbar-link ">Login </NavLink> */}
                            <NavLink to="/contact" className="navbar-link ">Contact </NavLink>
                            <NavLink to="/cart" className="navbar-link ">Cart</NavLink>
                            <NavLink to="/Profile" className="navbar-link"><FaUser /></NavLink>
                            <NavLink to="/logOut" className="navbar-link">LogOut</NavLink>
                        </div>


                        <button onClick={() => setShowLinks(!showLinks)}> <CgMenu></CgMenu></button>
                    </div>
                </div>
            </>)
        }
        else {
            return (<>
                <div className="navbar">
                    <div className="left-side">
                        <div className="Logo"></div>
                        <NavLink to="/">
                            <img src={pic1} className="logo" alt="logo"></img>
                        </NavLink>
                    </div>
                    <div className="right-side">
                        <div className="links" id={showLinks ? "hidden" : ""}>
                            <NavLink to="/foodZone" className="navbar-link ">Food-Zone</NavLink>
                            <NavLink to="/login" className="navbar-link ">Login </NavLink>
                            <NavLink to="/contact" className="navbar-link ">Contact </NavLink>
                            <NavLink to="/cart" className="navbar-link ">Cart</NavLink>
                            <NavLink to="/Profile" className="navbar-link"><FaUser /></NavLink>
                            {/* <NavLink to="/logOut" className="navbar-link">LogOut</NavLink> */}
                        </div>


                        <button onClick={() => setShowLinks(!showLinks)}> <CgMenu></CgMenu></button>
                    </div>
                </div>
            </>)
        }

    }


    return (

        <>

            <Rendermenu />



        </>
    )
}

export default Navbar;
