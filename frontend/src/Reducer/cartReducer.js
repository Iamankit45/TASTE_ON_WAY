import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
const cartReducer = (state, action) => {


    if (action.type === "ADD_TO_CART") {
        (async () => {
            const isAuthenticated = async () => {
                try {
                    const res = await fetch("http://localhost:8000/api/v1/users/profile", {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    if (res.ok) {
                        return true; // User is authenticated
                    } else {
                        return false; // User is not authenticated
                    }
                } catch (error) {
                    console.log(error);
                    return false; // Error occurred during authentication
                }
            };

            const isUserAuthenticated = await isAuthenticated();

            if (isUserAuthenticated) {
                let { amount, food } = action.payload;

                let existingProduct = state.cart.find((curItem) => curItem.id === food._id);

                if (existingProduct) {
                    let updatedProduct = state.cart.map((curElem) => {
                        if (curElem.id === food._id) {
                            let newAmount = curElem.amount + amount;

                            return {
                                ...curElem,
                                amount: newAmount,
                            };
                        } else {
                            return curElem;
                        }
                    });

                    return {
                        ...state,
                        cart: updatedProduct,
                    };
                } else {
                    let cartFood = {
                        id: food._id,
                        name: food.name,
                        amount,
                        cost: food.cost,
                        restaurant_name: food.restaurant_name,
                        photo: food.photo,
                    };

                    return {
                        ...state,
                        cart: [...state.cart, cartFood],
                    };
                }
            } else {
                // User is not authenticated, handle the error or show a message
                console.log("User is not authenticated");
                return state; // Return the current state
            }
        })();
    }




    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter(
            (curItem) => curItem.id !== action.payload
        );
        return {
            ...state,
            cart: updatedCart,
        };
    }

    // to set the increment and decrement
    if (action.type === "SET_DECREMENT") {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount - 1;

                if (decAmount <= 1) {
                    decAmount = 1;
                }

                return {
                    ...curElem,
                    amount: decAmount,
                };
            } else {
                return curElem;
            }
        });
        return { ...state, cart: updatedProduct };
    }

    if (action.type === "SET_INCREMENT") {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let incAmount = curElem.amount + 1;



                return {
                    ...curElem,
                    amount: incAmount,
                };
            } else {
                return curElem;
            }
        });
        return { ...state, cart: updatedProduct };
    }



    if (action.type === "SET_CART") {
        return {
            ...state,
            cart: action.payload,
        };

    }



    // to empty or to clear to cart
    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        };
    }
    return state;

}
export default cartReducer