
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartContext } from "../Context/cartContext";

const AddToCart = ({ food }) => {


    const [amount, setAmount] = useState(1);

    const {addToCart} = useCartContext();
    const { _id, cost, name, restaurant_name, photo } = food;
    // console.log(food);
    const setDecrease = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1);
    };

    const setIncrease = () => {
        setAmount(amount + 1);
    };


    return (
        <>
            <div>
                <button onClick={() => setDecrease()}> <FaMinus /></button>{amount}

                <button onClick={() => setIncrease()}> <FaPlus /></button>
            </div>

            <NavLink to="/cart" onClick={() => addToCart(amount,food)} >
                <button>Order Now</button>
            </NavLink>
          

        </>
    )
}

export default AddToCart