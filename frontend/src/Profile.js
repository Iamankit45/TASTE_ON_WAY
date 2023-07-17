import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/profile', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
    {user ? (
      <div className="profile-details">
        {user.photo && (
          <img src={user.photo} alt="Profile" className="profile-photo" />
        )}
        <div className="profile-info">
          <h2>Profile</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.userName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone No:</strong> {user.phone}
          </p>
          {/* Display other user details as needed */}
        </div>
      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  );
};

export default Profile;
