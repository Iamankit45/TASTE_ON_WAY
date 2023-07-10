import React, { useEffect } from 'react'
import CartItem from "./Components/CartItem";
import { useCartContext } from "./Context/cartContext";
const Cart = () => {


  







    const { cart, clearCart } = useCartContext();
    // console.log(cart);
    return (
        <>
            <div className="cart-container">
                <div className="cart-Heading">
                    <div className="cart-foodDetails">
                        <p> Food_Details </p> </div>
                    <div className="cart-foodQuantity">
                        <p> | Quantity </p></div>
                    <div className="cart-foodPrice">
                        <p> | Price</p> </div>
                    <div className="cart-TotalfoodPrice">
                        <p> | Total_Price</p> </div>
                </div>
                <hr />

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