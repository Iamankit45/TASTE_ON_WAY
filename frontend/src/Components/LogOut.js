import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from '../Context/userContext';
const LogOut = () => {
    const { state, dispatch } = useUserContext();
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

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
            else{
                dispatch({ type: "USER", payload: false})
                navigate("/login")
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