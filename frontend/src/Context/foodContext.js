import { createContext, useContext, useEffect, useReducer } from "react";


import axios from "axios";
import reducer from "../Reducer/foodReducer";


const AppContext = createContext();

const API = "http://localhost:8000/api/v1/food";


const initialState = {
    isLoading: true,
    isError: false,
    foodItems: [],
   
  };
  



const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getFoods = async (url) => {

      // dispatch({ type:"SET_LOADING"});
        try {
         
          const res = await axios.get(url);
         
          const foodItems = await res.data.data;
          // foodItems=foodItems.data;
          // console.log(foodItems);
        
          dispatch({ type: "SET_API_DATA", payload:foodItems });
         
        } catch (error) {
         
          dispatch({ type: "API_ERROR" });
        }
      };

   

    useEffect(() => {
        getFoods(API);
    },[]);


    return (
        <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
    );
}

// custom hooks
const useFoodContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useFoodContext };