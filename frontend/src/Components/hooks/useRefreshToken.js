import { API } from "../../api/axios";
import { useAuth } from '../../context/Auth'
import { useNavigate, useLocation } from 'react-router-dom';

function useRefreshToken() {

    const navigate = useNavigate();
    const location = useLocation();
    const {user, login, logout} = useAuth();

    async function refresh() {
      
        try{

            const response = await API.get("users/renewAccessToken", {
                withCredentials: true
            });
            
            login({...user, accessToken: response.data.accessToken, profilePhoto: response.data.profilePhoto});
            return response.data.accessToken; 
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken
