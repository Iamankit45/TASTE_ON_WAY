import axios from 'axios';
const BaseUrl = "http://localhost:8000/api/v1"

export const API = axios.create({baseURL: BaseUrl});

export const PrivateAPI = axios.create({
    baseURL: BaseUrl,
    headers:{'content-type':'application/json'}, 
    withCredentials:true
});


export const checkEmailUsername = (emailUsername) => API.post('users/checkPassAndUserID',emailUsername);
export const login = (formData) => API.post('users/login',formData, {withCredentials:true});
export const signup = (formData) => API.post('users/signup',formData, {withCredentials:true});
export const logout = () => API.delete('users/logout', {withCredentials:true})



