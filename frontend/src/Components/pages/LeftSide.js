import React from 'react'
import './LeftSide.css';
import { useFilterContext } from '../../Context/filterContext';

function LeftSide() {

  const { filters: { text, category, restaurant_name }, updateFilterValue, filter_Foods, all_Foods } = useFilterContext();

  const getUniqueData = (data, property) => {

    let newval = data.map((curElem) => {
      return curElem[property];
    });
    return newval = ["all", ...new Set(newval)];

  }



  const categoryOnlyData = getUniqueData(all_Foods, "category");
  const restaurantOnlyData = getUniqueData(all_Foods, "restaurant_name")

  // console.log(filter_Foods);
  return (
    <div className='leftside-main'>
      <div className='leftside-searchBox'>

        <form onSubmit={(e) => e.preventDefault()}>

          <input type='text' name="text"
            placeholder="Search"
            value={text}  //ye vala text mera ek state variable hai
            onChange={updateFilterValue}   //ye ek finction hai 
            className='leftside-Inputsearch' >
          </input>
        </form>
      </div>

      <div className='filter-category'>
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "filter-categoryButton-active" : "filter-categoryButton"}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className='hotelName-filter'>
        <h3>Restaurants</h3>

        <div>
          {restaurantOnlyData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="restaurant_name"
                value={curElem}
                className={curElem === restaurant_name ? "filter-categoryButton-active" : "filter-categoryButton"}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>






      </div>



    </div>
  )
}

export default LeftSide