import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("AnkitCart");
    // if (localCartData === []) {
    //     return [];
    // } else {
    //     return JSON.parse(localCartData);
    // }

    const parsedData = JSON.parse(localCartData);

    if (!Array.isArray(parsedData)) {
        return [];
    }
    return parsedData;
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50,
};


const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (amount, food) => {

        dispatch({ type: "ADD_TO_CART", payload: { amount, food } })

    }
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    // to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };
    useEffect(() => {


        localStorage.setItem("AnkitCart", JSON.stringify(state.cart));
    }, [state.cart]);


    return <CartContext.Provider value={{ ...state, addToCart,clearCart, removeItem, }}>{children}</CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
};
export { CartProvider, useCartContext };