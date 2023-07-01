import React from 'react'
import './footer.css';
import { NavLink } from 'react-router-dom';
import { FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (

    <div className="footer">
      <div className="footer-content">
        <div className="footer-col1">
          <h3>Want to know more?</h3>
          <p>Are you unable to find what you're looking for?
            Reach out to our media or investor relations team and we'll be in touch shortly.</p>
          <NavLink to="/contact"><button >Contact us</button></NavLink>
        </div>
        <div className="footer-col2">
          <p>Ankit Foodie</p>
          <ul className='footer-links'>
            <li>
              <NavLink to="#" className="foot-links">Our Markets</NavLink>
            </li>
            <li>
              <NavLink to="#" className="foot-links">Our Story</NavLink>
            </li>
            <li>
              <NavLink to="#" className="foot-links">Responsible Business</NavLink>
            </li>

          </ul>

        </div>
        <div className="footer-col3">
          <p>Direct To</p>
          <ul className="footer-links2">
            <li>
              <NavLink to="#" className="foot-links">Financial Calendar</NavLink>
            </li>
            <li>
              <NavLink to="#" className="foot-links">Results and Reports</NavLink>
            </li>
            <li>
              <NavLink to="#" className="foot-links">Shareholder Information</NavLink>
            </li>
          </ul>
        </div>




        <div className="footer-col4">
          <div className="social-media">
            <a href="#" ><FaInstagramSquare className='insta'></FaInstagramSquare></a>
            <a href="#" ><FaLinkedin className='insta'></FaLinkedin> </a>
            <a href="#" ><FaTwitterSquare className='insta'></FaTwitterSquare> </a>
            <a href="#" ><FaTelegram className='insta'></FaTelegram> </a>
            
           
          </div>
        </div>


      </div>
      
      <div className="footer-bootom">
        <p className="copyright">Copyright © 2023 Just EatAll rights reserved.</p>
        <p>Cookie Statement </p>
        <p>Privacy Statement</p>
      </div>

    </div>

  )
}

export default Footer;