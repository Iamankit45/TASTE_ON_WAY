import { PrivateAPI } from "../../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../../context/Auth";


function useAxiosPrivate() {

    const refresh = useRefreshToken();
    const { user } = useAuth();

    useEffect(() => {

        const requestIntercept = PrivateAPI.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] =  `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (err) => Promise.reject(err)
        );

        const responseIntercept = PrivateAPI.interceptors.response.use(
            response => response,
            async (err) =>{
                const prevRequest = err?.config;

                if(err?.response.status === 500 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return PrivateAPI(prevRequest);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            PrivateAPI.interceptors.request.eject(requestIntercept);
            PrivateAPI.interceptors.response.eject(responseIntercept);
        }
    },[user, refresh])
    
    return PrivateAPI;
}

export default useAxiosPrivate
