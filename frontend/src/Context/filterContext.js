import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/filterReducer";

import { useFoodContext } from "./foodContext";

const FilterContext = createContext();

const initialState = {

    filter_Foods: [],
    all_Foods: [],

    filters: {
        text: "",
        category: "all",
        cost: 0,
        restaurant_name:"all",

    }

};

export const FilterContextProvider = ({ children }) => {


    const { foodItems } = useFoodContext();
    // console.log(foodItems);

    const [state, dispatch] = useReducer(reducer, initialState);


   
    // console.log(allFoodItems);


    // update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    };




    

    useEffect(() => {

        dispatch({ type: "FILTER_FOODS" })
    }, [foodItems, state.filters])


    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_FOODS", payload: foodItems})

    }, [foodItems])


   

    return (<FilterContext.Provider value={{ ...state,updateFilterValue }} >{children}</FilterContext.Provider>);
}



//custom hook bana rhe h

export const useFilterContext = () => {
    return useContext(FilterContext);
};