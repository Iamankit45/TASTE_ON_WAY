import { createContext, useContext, useEffect, useReducer } from "react";


import axios from "axios";
import reducer from "../Reducer/foodReducer";
import useAxiosPrivate from "../components/hooks/useAxiosPrivate";

const AppContext = createContext();


const API = "http://localhost:8000/api/v1/food";


const initialState = {
  isLoading: true,
  isError: false,
  foodItems: [],
  singleFood: {}
};




const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
 


  const getFoods = async (url) => {

    // dispatch({ type:"SET_LOADING"});
    try {

      const res = await axios.get(url);
      // console.log("hii");
      // console.log(res);

      const foodItems = await res.data.data;
      // foodItems=foodItems.data;
      // console.log(foodItems);

      dispatch({ type: "SET_API_DATA", payload: foodItems });

    } catch (error) {

      dispatch({ type: "API_ERROR" });
    }
  };


  const getSingleFoodData = async (url) => {
    // console.log(url);

    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const singleFood = await res.data.data;
      // console.log(singleFood);
      dispatch({ type: "SET_SINGLE_FOOD", payload: singleFood });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  }


  useEffect(() => {
    getFoods(API);
  }, []);


  return (
    <AppContext.Provider value={{ ...state, getSingleFoodData }}>{children}</AppContext.Provider>
  );
}

// custom hooks
const useFoodContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useFoodContext };