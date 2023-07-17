import React, { useEffect, useState } from 'react'
import CartItem from "./Components/CartItem";
import { useCartContext, DbCartItem } from "./Context/cartContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
const Cart = () => {

  const navigate = useNavigate();
  const callCartPage = async () => {

    try {

      const res = await fetch("http://localhost:8000/api/v1/users/profile", {
        method: 'GET',
        headers: {

          Accept: 'application/json',

          "Content-Type": 'application/json',


        },

        credentials: "include",

      });


      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {

      console.log(error);
      navigate("/login");
    }


  }







  useEffect(() => {
    callCartPage();
    DbCartItem();
  })





  const { cart, clearCart } = useCartContext();


  console.log(cart);

  if (!cart) {


    return <>
      <div>No items in the cart</div>
    </>
  }

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }



  return (
    <>
      <div className="cart-container">


        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <div>
          <hr />

          <button onClick={clearCart} className="cart-clearButton">
            Clear cart
          </button>
        </div>


      </div>


    </>
  )

}





export default Cart

