import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
 

  useEffect(() => {
    const verifyToken = async () => {
      try {
        
       
          const res = await fetch("http://localhost:8000/api/v1/users/profile", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

        //   console.log(res.status);
          if (res.status === 200) {
            setLoggedIn(true); // Token is valid, user is logged in
          } else {
            setLoggedIn(false); // Token is invalid or expired, user is not logged in
            // navigate("/login"); // Redirect to login page
          }
        
      } catch (error) {
        console.log(error);
        setLoggedIn(false); // Error occurred during token verification, user is not logged in
        // navigate("/login"); // Redirect to login page
      }
    };

    verifyToken();
  }, []);

  return <UserContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };
