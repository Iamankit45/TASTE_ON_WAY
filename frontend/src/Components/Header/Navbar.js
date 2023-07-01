import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import './navbar.css';
import { CgMenu } from "react-icons/cg";

const Navbar = () => {
    // const [menuIcon, setMenuIcon] = useState(false);
    const [showLinks, setShowLinks] = useState(false);

    return (
        <div className="navbar">
            <div className="left-side">
             <div className="Logo"></div>   
             <NavLink to ="/">
               <img src="./images/logo1.png" className="logo" alt="logo"></img>
               </NavLink>
            </div>
            <div className="right-side">
            <div className="links" id={showLinks ? "hidden" : ""}>
                    <NavLink to="/foodZone" className="navbar-link ">Food-Zone</NavLink>
                    <NavLink to="/about" className="navbar-link ">About </NavLink>
                    <NavLink to="/contact" className="navbar-link ">Contact </NavLink>

                </div>
               
                
                <button  onClick={() => setShowLinks(!showLinks)}> <CgMenu></CgMenu></button>
            </div>
        </div>
    )
}

export default Navbar;
