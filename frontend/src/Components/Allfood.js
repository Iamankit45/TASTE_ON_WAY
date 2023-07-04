
import { useFoodContext  } from '../Context/foodContext';
import { useFilterContext } from '../Context/filterContext';
import LeftSide from './LeftSide'
import './Allfood.css'

import Cards from "./Cards"

const Allfood = () => {

  const { isLoading, foodItems } = useFoodContext();
  const{filter_Foods}=useFilterContext();

  // console.log(isLoading);
  if (isLoading) {
    return <div>Loading...</div>
  }

  // console.log(foodItems);

  if(filter_Foods.length<=0){
    return (
    <div>
     <h3>No food items matched according to your filter</h3> 
      </div>
      )
    
  }
  return (

    <div className="allfood-container">
      <div className="allfood-left">
        <LeftSide />
      </div>
      <div className='allfood-main'>


  

     
     
        {filter_Foods.map((curElem) => {
          return <Cards key={curElem.id} {...curElem} />;
        })
        }




      </div>
    </div>
  )


}

export default Allfood