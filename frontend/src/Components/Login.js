import { useRef, useState, useEffect, } from 'react';
import { useAuth } from '../context/Auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./login.css";
import * as api from '../api/axios';


const initialState = { email: "", password: "" };


export default function Login() {

    const navigate = useNavigate();
    const auth = useAuth();                                 // to set user context
    const location = useLocation()
    const redirectPath = location.state?.path || '/devlog'; // would be redirected to this path after successful submission
    const [loading, setLoading] = useState(false);          // is for loading effect on top of submit button
    const [empty, setEmpty] = useState(false);              // is for giving warning

    const [formData, setFormData] = useState(initialState); //email and username would be kept here to posted.


    // To show invalid credentials warning.
    function invalidWarning(val) {
        let element = document.getElementById("invalid");
        if (val) {
            element.style.visibility = "visible";
        }
        else {
            element.style.visibility = "hidden";
        }
    }

    // To check if all fields are provided or not;
    function checkMandatory() {
        if (formData.email === "" || formData.password === "") {
            setEmpty(true);
            return (false);
        }
        else {
            setEmpty(false)
            return (true);
        }
    }



    // On every change in input field, this functions updates formdata.
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        invalidWarning(false);
    }

    // The function to handle submit action.
    // it checks for the responses from the server
    async function handleSubmit(e) {
        try {
            e.preventDefault();


            let cond1 = checkMandatory();    
            if (cond1) {

                setLoading(true);

                const resObj = await api.login({ email: formData.email, password: formData.password });

                if (resObj.status == 200) {

                    auth.login({
                        email: formData.email,
                        accessToken: resObj.data.accessToken,
                        profilePhoto: resObj.data.data.profilePhoto
                    })

                    navigate(redirectPath, { replace: true });

                    
                }
            }
            else {
                console.log("cant post");
                setLoading(false);
            }
        }
        catch (err) {
            if (!err?.response) {
                console.log("No server response");
                setLoading(false);
               

            }
            else if (err.response.status === 401) {

                console.log('wrong credentials')
                setLoading(false);
                invalidWarning(true);
            }
            console.log(err.response);

        }
    }

    return (
        <div className='loginPage'>
            <h3 className='loginName'>Taste on <span className='ex'>Way</span></h3>
            <h4 className='loginName'>Sign In<hr /></h4>

            {empty ? (<h4 className='warnings'>All Fields Are Mandatory</h4>) : null}

            <div id='invalid' className='invalid'>Invalid Email Or Password</div>

            <form onSubmit={handleSubmit}>

                <div>
                    <input id='emailInput' placeholder='Email Address*' name="email" className='box boxDown' type="email" onChange={handleChange} />
                    <input placeholder='Password*' name="password" className='box boxDown' type="password" onChange={handleChange} />
                </div>
                
                <button type='Submit' disabled={loading} className='submitButton'>

                    {loading ? ( <img className='spinner' src={require("./img/spinner6.gif")}/>)
                    :
                    <>Submit</>
                    }
                   
                </button>


                <div className='lastDiv'>Don't have an account ? &nbsp; Sign Up <Link className='here' to='/devlog/signup'>Here</Link></div>

            </form>
        </div>
    )

}