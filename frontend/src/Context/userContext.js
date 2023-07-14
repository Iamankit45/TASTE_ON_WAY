import { createContext, useContext, useReducer, useEffect } from "react";

import { reducer } from "../Reducer/userReducer";

const UserContext = createContext();

const initialState = null;

const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)


    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

const useUserContext = () => {
    return useContext(UserContext);
};

export { useUserContext, UserProvider };