import axios from 'axios';
import { BASE_URL } from '../services/helper';

// /Users/ANKIT KUMAR/Desktop/Taste_on_way/frontend/src/api/axios.js
const BaseUrl = `${BASE_URL}/api/v1`

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



