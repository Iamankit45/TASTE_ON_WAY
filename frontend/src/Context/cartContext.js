import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from ".././Reducer/cartReducer";
import { NavLink, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../components/hooks/useAxiosPrivate";

const CartContext = createContext();


const initialState = {
   
   
    cart:[],
    total_item: "",
    total_price: "",
    shipping_fee: 50,
   
};


const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const PrivateApi = useAxiosPrivate();
    


    const GetCartData = async() => {

        let CartData;

        
            try {
                const res = await PrivateApi.get("/users/profile/getCartData");
                console.log(res.data.data)
                CartData=res.data.data;
                dispatch({ type: "GET_CART_DATA", payload: CartData })
               
            } catch (error) {
                console.log(error);
            } 
          
        
    
    }
    const addToCart = (amount, food) => {

        // console.log(amount,food);
        dispatch({ type: "ADD_TO_CART", payload: { amount, food } })

    }
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };



    // increment and decrement the items

    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrement = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };


    // to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };


    const addedToCart= async()=>{

      
        try {
           
        
            // console.log("hii from the cart ankit");
            const res=await PrivateApi.post("/users/addToCart",state.cart);
            console.log(res.data.data);
        } catch (error) {
            
            console.log(error);
        }
    }


    useEffect(() => {
      
       GetCartData()
      
    },[]);


    useEffect(() => {
        // Once cart data is fetched and context is updated, call addedToCart
        if (state.cart.length > 0) {
            addedToCart();
        }
    }, [state.cart]);

    return <CartContext.Provider value={{
        ...state, addToCart, clearCart, removeItem, setDecrease,
        setIncrement,GetCartData
    }}>{children}</CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
};


export { CartProvider, useCartContext };















