import React from "react";
import { NavLink } from "react-router-dom";
import './cards.css'
import SingleFoodData from "./SingleFoodData";

const Cards = (curElem) => {

  const { id, name, photo, cost, category, restaurant_name } = curElem
  // console.log(id, name, photo, cost, category);
  return (

    <NavLink to={`/SingleFoodData/${id}`} className="nav-cardname">
    <div className="cards">

      <div className="card">

        <img src={photo} alt={name} className="card__img"></img>


        <div className="card__info">
       
          <h1 className="card_name"> {name}</h1>
         
          <span className="card__category">{category}</span>
          <div className="card__title">Rs. {cost}</div>
          <span className="card__restaurantname"> Restaurant Name : {restaurant_name}</span>



        </div>
      </div>
    </div>
    </NavLink>
  )
}

export default Cards;