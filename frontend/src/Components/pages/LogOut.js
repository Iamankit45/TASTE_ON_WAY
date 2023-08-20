import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/Auth';


const LogOut = () => {


    const auth = useAuth();  


    // const {setLoggedIn} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {


        fetch("http://localhost:8000/api/v1/users/logOut", {

            method: 'GET',
            headers: {

                Accept: 'application/json',

                "Content-Type": 'application/json',


            },

            credentials: "include",
        }).then((res) => {

            console.log(res);

            if (res.status == 200) {
             console.log("logging out");
                // setLoggedIn(false);
               auth.logout();
                navigate("/login")
                
            }
            else{
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })



    })

    return (
        <div>LogOut</div>
    )
}

export default LogOut