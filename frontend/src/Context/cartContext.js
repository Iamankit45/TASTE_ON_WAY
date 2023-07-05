import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const initialState = {
    cart: [],
    // cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50,
};


const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
   
    const addToCart = (amount,food) => {
     
        dispatch({ type: "ADD_TO_CART", payload: { amount,food } })
       
    }
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    return <CartContext.Provider value={{ ...state, addToCart ,removeItem,}}>{children}</CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
};
export { CartProvider, useCartContext };