const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_FOODS":
            return {
                ...state,
                filter_Foods: [...action.payload],
                all_Foods: [...action.payload],
                filters: { ...state.filters },
            };


        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload
            // console.log(name, value);

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            };

        case "FILTER_FOODS":
            let { all_Foods } = state;
            let tempFilterFoods = [...all_Foods];

            const { text,category ,restaurant_name} = state.filters;






            if (text) {


                tempFilterFoods = tempFilterFoods.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                })
            }
           
            if (category !== "all") {

          
                tempFilterFoods = tempFilterFoods.filter((curElem) => {
                    return curElem.category===category;
                })
            }
            

            if (restaurant_name !== "all") {

          
                tempFilterFoods = tempFilterFoods.filter((curElem) => {
                    return curElem.restaurant_name===restaurant_name;
                })
            }

            // console.log(tempFilterFoods);


            return {
                ...state,
                filter_Foods: tempFilterFoods,
            };

        default:
            return state;
    }

} 

export default filterReducer;