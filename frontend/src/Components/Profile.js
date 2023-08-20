
import { useEffect, useState } from "react"
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import './Profile.css';
import React from 'react'

const Profile = () => {

  const [ProfileArray, setProfileArray] = useState();
  const PrivateApi = useAxiosPrivate();

  let userName;

  const getProfile = async () => {

    try {
      const res = await PrivateApi.get("/users/profile/");
      console.log(res.data.data)
      setProfileArray(res.data.data);
      
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    getProfile();
  }, [])

  return (

    <>
      <div className="profile-container">
        {ProfileArray ? (
          <div className="profile-details">
            {ProfileArray.profilePhoto && (
              <img src={ProfileArray.profilePhoto} alt="Profile" className="profile-photo" />
            )}
            <div className="profile-info">
              <h2>Profile</h2>
              <p>
                <strong>Name:</strong> {ProfileArray.name}
              </p>
              <p>
                <strong>Username:</strong> {ProfileArray.userName}
              </p>
              <p>
                <strong>Email:</strong> {ProfileArray.email}
              </p>
              <p>
                <strong>Phone No:</strong> {ProfileArray.phone}
              </p>

            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>


  )
}

export default Profile