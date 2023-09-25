import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useFoodContext } from '../../context/foodContext';
import { FaMinus, FaPlus } from "react-icons/fa";
import AddToCart from "./AddToCart";
import "./single.css";
const API = "http://localhost:8000/api/v1/food/";

const SingleFoodData = () => {

    const { getSingleFoodData, isSingleLoading, singleFood } = useFoodContext();

    const { id } = useParams();

    let API1 = API + id;
    // console.log(API1);


    const {
        _id,
        name,
        category,
        cost,
        restaurant_name,
        photo
    } = singleFood;

    useEffect(() => {
        getSingleFoodData(API1);
    }, []);


    if (isSingleLoading) {
        return <div className="page_loading">Loading.....</div>;
    }
    //   console.log(name);
    return (
        <>

            <div className="SingleFoodPage">
                <div className="SingleFoodPage-brief">
                    <div className="SingleFoodPage-photo">
                        <img src={photo} alt={name}></img>
                    </div>
                    <div className="SingleFoodPage-info">


                        <h1 className="SingleFoodPage_name"> {name}</h1>

                        <span className="SingleFoodPage-category">{category}</span>
                        <div className="SingleFoodPage-cost">Rs. {cost}</div>
                        <span className="SingleFoodPage-restaurantname"> Restaurant Name : {restaurant_name}</span>

                        <div className="SingleFoodPage-addToCart">

                        <AddToCart food ={singleFood}/>
                         
                           
                        </div>


                        <div className="SingleFoodPage-orderNow">
                      
                        </div>
                    </div>
                </div>
                
            </div>


        </>

    );
}

export default SingleFoodData;