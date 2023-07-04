import React from 'react'
import './LeftSide.css';
import { useFilterContext } from '../Context/filterContext';

function LeftSide() {

const {filters:{text}, updateFilterValue,filter_Foods}= useFilterContext();


console.log(filter_Foods);
  return (
    <div className='leftside-main'>
       <div className='leftside-searchBox'>
       <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' name="text"
            placeholder="Search"
            value={text}  //ye vala text mera ek state variable hai
            onChange={updateFilterValue}   //ye ek finction hai 
            className='leftside-Inputsearch'
            
            >
         
        </input> 
        </form>
       </div>
    </div>
  )
}

export default LeftSide