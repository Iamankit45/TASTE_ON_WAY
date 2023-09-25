import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
const cartReducer = (state, action) => {




    if (action.type === "GET_CART_DATA") {

        let items = action.payload;

        
        // console.log(items);
        return {
            ...state,
           
            cart: items,
        };
    }
    if (action.type === "ADD_TO_CART") {

      
        let { amount, food } = action.payload;
        
                //  console.log("now from the reducer");
                //  console.log(food);
                 let existingProduct = state.cart.find((curItem) => curItem.id === food._id);
                // console.log("after reducer");
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


    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isLoading: true,
        };
    }


    
    return state;

}
export default cartReducer