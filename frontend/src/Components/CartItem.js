import React from 'react'
import CartAmountToggle from "./CartAmountToggle";
import { useCartContext } from "../Context/cartContext";
import { FaTrash } from "react-icons/fa";
import "./cartItem.css";

const CartItem = ({ id, name, photo, cost, amount ,restaurant_name }) => {
    // console.log(id, name, photo ,cost, amount);
    const { removeItem,setDecrease,
        setIncrement} = useCartContext();

    


    return (
        <div className="cart_heading">
            <div className="cart-image--name">
                <div className="cart-image">
                    <figure>
                        <img src={photo} alt={name} className='cart-Image'/>
                    </figure>
                </div>
                <div className="cart-name">
                    <p>{name}</p>

                </div>

            </div>

            <div className="cart-food-quanity">
                <p>Quantity :

                    <CartAmountToggle
                        amount={amount}
                        setDecrease={() => setDecrease(id)}
                        setIncrease={() => setIncrement(id)}
                    /></p>
            </div>
            <div className="cart-food-cost">
                <p> Rs.{cost}</p>
            </div>
            <div className="cart-food-totalCost">
                <p> total cost: {amount * cost}</p>
            </div>
            <div className="cart-restaurantName">
                <p> Items from :{restaurant_name}</p>
            </div>
            <div className="cart-pay">
                <p>Proceed to pay
                 <button>Pay</button>
                </p>
            </div>
            <div>
            <p>Remove
                <FaTrash className="remove_icon" onClick={() => removeItem(id)} /></p>
            </div>
        </div>
    )
}

export default CartItem