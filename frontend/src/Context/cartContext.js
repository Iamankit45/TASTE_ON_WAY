import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/cartReducer";
import { NavLink, useNavigate } from "react-router-dom";

const CartContext = createContext();

// to get cart data from the backened db
export const DbCartItem = async () => {

    let CartData;
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
        CartData = data.data;
        // console.log(data.data);
        if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;

        }
    } catch (error) {

        console.log(error);
        // navigate("/login");


    }


    return CartData;

}


//  export const fetchCartData = async () => {
//     let cartData;
//     try {
//       const res = await fetch("http://localhost:8000/api/v1/users/profile/getCartData", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
  
//       if (!res.ok) {
//         throw new Error("Failed to fetch cart data");
//       }
  
//       const data = await res.json();
//       cartData=data.data;
//       return cartData;
//     } catch (error) {
//       console.log(error);

//       // Handle the error (e.g., navigate to login)
//       return [];
//     }
//   };




const initialState = {
    // cart: [],
    cart: await DbCartItem(),
    total_item: "",
    total_price: "",
    shipping_fee: 50,
};


const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    // const loadCartData = async () => {
    //     const cartData = await fetchCartData();
    //     dispatch({ type: "SET_CART", payload: cartData });
    //   };
    
    //   useEffect(() => {
    //     loadCartData();
    //   }, []);

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

            // console.log(res.status);

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

        }).catch((err) => {
            console.log(err);
        })


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















