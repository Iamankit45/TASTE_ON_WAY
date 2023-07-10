import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

// const getLocalCartData = () => {
//     let localCartData = localStorage.getItem("AnkitCart");
//     // if (localCartData === []) {
//     //     return [];
//     // } else {
//     //     return JSON.parse(localCartData);
//     // }

//     const parsedData = JSON.parse(localCartData);

//     if (!Array.isArray(parsedData)) {
//         return [];
//     }
//     return parsedData;
// };


// to get cart data from the backened db
const DbCartItem = async () => {
   let CartData ;
    try {

        const res = await fetch("http://localhost:8000/api/v1/users/profile/getCartData", {
            method: 'GET',
            headers: {

                Accept: 'application/json',

                "Content-Type": 'application/json',


            },

            credentials: "include",

        });


        const data = await res.json();
       CartData= data.data;
        // console.log(data.data);
        if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
        }
    } catch (error) {

        console.log(error);

    }

    
    return CartData;

}





const initialState = {
    // cart: [],
    cart:await DbCartItem(),
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
    useEffect(() => {


        fetch("http://localhost:8000/api/v1/users/addToCart", {

            method: 'POST',
            headers: {

                Accept: 'application/json',

                "Content-Type": 'application/json',


            },

            body: JSON.stringify(state.cart),
            credentials: "include",
        }).then((res) => {

            console.log(res.status);

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

        }).catch((err) => {
            console.log(err);
        })





        localStorage.setItem("AnkitCart", JSON.stringify(state.cart));
    }, [state.cart]);


    return <CartContext.Provider value={{
        ...state, addToCart, clearCart, removeItem, setDecrease,
        setIncrement,
    }}>{children}</CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
};
export { CartProvider, useCartContext };