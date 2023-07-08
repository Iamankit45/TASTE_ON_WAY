import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom";


const SignUp = () => {
const navigate = useNavigate();
    const [user, setUser] = useState({

        name: "", userName: "", password: "", email: "", phone: "",
    });



    let name, value;

    const handleInputs = (e) => {

        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })

    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, userName, password, email, phone } = user;


        const res = await fetch("http://localhost:8000/api/v1/users/register", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, userName, password, email, phone
            })


            
        })

        const data  =await res.json();

        if (res.status===500||!data){
            window.alert("Invalid");
            console.log("inavlid registration");


        }else{
            window.alert("registration successfull");
            console.log("registration successsufl");
            navigate('/login');
        }
    }
    return (

        <>
            <div className="signUp">
                <div className="signUp-container">
                    <div className="signUp-form">
                        <h2 className="signUp-form-title">SignUp</h2>
                        <form method="POST" className="signUp-register-form" id="registerForm">
                            <div className="signUp-formGroup">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="your name"></input>
                            </div>
                            <div className="signUp-formGroup">
                                <label htmlFor="Username">Username</label>
                                <input type="text" name="userName" id="UserName" placeholder="Username" autoComplete="off" value={user.userName} onChange={handleInputs}></input>
                            </div>
                            <div className="signUp-formGroup">
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" id="email" placeholder="email" autoComplete="off" value={user.email} onChange={handleInputs}></input>
                            </div>
                            <div className="signUp-formGroup">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="password" autoComplete="off" value={user.password} onChange={handleInputs}></input>
                            </div>
                            <div className="signUp-formGroup">
                                <label htmlFor="Phone">Phone no</label>
                                <input type="number" name="phone" id="phone" placeholder="Phone" autoComplete="off" value={user.phone} onChange={handleInputs}></input>
                            </div>
                            <div className="signUp-formGroup">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={PostData}></input>

                                <div className="already-signUp">
                                    <NavLink to="/login"><p> ALREADY signed up</p></NavLink>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>


        </>

    )
}

export default SignUp