import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {


  const navigate = useNavigate();
  const callProfilePage = async () => {

    try {

      const res = await fetch("http://localhost:8000/api/v1/users/profile", {
        method: 'GET',
        headers: {
         
          Accept: 'application/json',
         
          "Content-Type": 'application/json',
          
          
        },
     
        credentials: "include",
       
      });


      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
     
      console.log(error);
      navigate("/login");
    }


  }



  useEffect(() => {
    callProfilePage();
  }, [])






  return (

    <>




      <div>Profile</div>
    </>
  )
}

export default Profile