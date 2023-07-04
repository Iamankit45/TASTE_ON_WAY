import React from "react";
import './cards.css'

const Cards = (curElem) => {

  const { id, name, photo, cost, category, restaurant_name } = curElem
  // console.log(id, name, photo, cost, category);
  return (
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
  )
}

export default Cards;