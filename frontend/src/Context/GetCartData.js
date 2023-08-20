import { useEffect } from "react";
import useAxiosPrivate from "../components/hooks/useAxiosPrivate";


const GetCartData = () => {

    let CartData;
    const PrivateApi = useAxiosPrivate();

    const getData = async () => {

        try {
            const res = await PrivateApi.get("/users/profile/getCartData");
            console.log(res.data.data)
            CartData=res.data.data;
        } catch (error) {
            console.log(error);
        }
    }


useEffect(() => {
    getData();
    return CartData;
    
})

}

export default GetCartData;