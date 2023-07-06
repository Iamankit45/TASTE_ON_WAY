import React from 'react'

const cartReducer = (state, action) => {


    if (action.type === "ADD_TO_CART") {
        let { amount, food } = action.payload;

        let cartFood = {
            id: food._id,
            name: food.name,
            amount,
            cost:food.cost,
            restaurant_name: food.restaurant_name,
            photo:food.photo,


        }


        return {
            ...state,
            cart: [...state.cart,cartFood]
        };

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