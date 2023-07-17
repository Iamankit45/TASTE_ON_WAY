import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from './Context/userContext';
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setLoggedIn} = useUserContext();
  

  const navigate = useNavigate();

  const LoginUser = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/v1/users/login", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
      body: JSON.stringify({
        email, password
      }),
    })

    const data = await res.json();
    // console.log(data);


    if (res.status === 500 || !data) {

      window.alert("Invalid");
      console.log("inavlid login");
    } else {
      window.alert("login successfull");

      setLoggedIn(true);


      navigate('/profile',{ state: { user: data.data } });
    }


  }

  return (
    <>
      <div className="login">

        <div className="login-container">
          <div className="login-form">
            <h2 className="login-form-title">login</h2>
            <form method="POST" className="login-register-form" id="registerForm">

              <div className="login-formGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="email" autoComplete="on" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
              </div>
              <div className="login-formGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="password" autoComplete="off" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
              </div>

              <div className="login-formGroup">
                <input type="submit" name="login" id="login" className="form-submit" value="login" onClick={LoginUser}></input>

                <div className="need-an-Account">
                  <NavLink to="/SignUp"><p> Need an acoount</p></NavLink>
                </div>
              </div>

            </form>
          </div>
        </div>


      </div>



    </>
  )
}

export default Login