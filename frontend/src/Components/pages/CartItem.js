import React from 'react'
import CartAmountToggle from "./CartAmountToggle";
import { useCartContext } from "../../context/cartContext";
import { FaTrash } from "react-icons/fa";
import "./cartItem.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../../services/helper';
// import { checkOut } from '../../../../backend/controller/payment/paymentCtrl';
// import PaymentPage from './Payment';

const CartItem = ({ id, name, photo, cost, amount, restaurant_name }) => {
    // console.log(id, name, photo ,cost, amount);
    const { removeItem, setDecrease, setIncrement } = useCartContext();
       



    const checkOutHandler = async (TotalAmount) => {
        const { data: { key } } = await axios.get(`${BASE_URL}/api/v1/getkey`)
        const { data: { order } } = await axios.post(`${BASE_URL}/api/v1/payment/checkout`, { TotalAmount })
        // console.log(key,order);

        // console.log(order);
        const options = {
            key,
            amount: order.TotalAmount,
            currency: "INR",
            name: "Ankit kumar",
            description: "payment for food ordering",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: `${BASE_URL}/api/v1/payment/paymentVerification`,
            prefill: {
                name: "Ankit kumar",
                email: "Ankit.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);

        // console.log(options);
        // console.log(razor);
        razor.open();
        removeItem(id);
    }



    




    return (
        <div className="cart_heading">
            <div className="cart-image--name">
                <div className="cart-image">
                    <figure>
                        <img src={photo} alt={name} className='cart-Image' />
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

                    <button onClick={() => checkOutHandler(amount * cost)}>Pay</button>
                    {/* <button onClick={checkOutHandler}>Pay</button>   */}
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