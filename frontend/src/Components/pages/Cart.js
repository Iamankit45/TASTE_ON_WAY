import React, { useEffect, useState } from 'react'
import CartItem from "./CartItem";
import { useCartContext, DbCartItem } from "../../context/cartContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const Cart = () => {

  const { cart, clearCart,setDecrease,setIncrement } = useCartContext();
    
  const [cartArray, setArray] = useState([]);

  
 console.log(cart);
  const PrivateApi = useAxiosPrivate();
  // const GetCartData = async () => {

  //   let CartData;


  //   try {
  //     const res = await PrivateApi.get("/users/profile/getCartData");
  //     console.log(res.data.data)
  //     // CartData = res.data.data;
  //     // cart=CartData;
  //     setArray(res.data.data);

  //   }
  //   catch (err) {
  //     console.log(err)
  //   }



  // }


  // useEffect(() => {

  //   GetCartData();
   
  // }, [cart])
    

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
            return <CartItem key={curElem.id}{...curElem} />;
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

