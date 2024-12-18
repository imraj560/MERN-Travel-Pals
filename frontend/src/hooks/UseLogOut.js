import { UseAuthContext } from "./UseAuthContext";
import { UseWorkoutsContext } from "./UseWorkoutsContext"; 
import { useState } from "react";
import { useCookies } from 'react-cookie';

export const UseLogOut = ()=>{
    const [user, setUser] = useState(null);
    const { dispatch } = UseAuthContext()
    const { dispatch : workoutsDispatch } = UseWorkoutsContext()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logout = ()=>{

        /**remove user from local storage */
        localStorage.removeItem('user');

        /**Remove Cookie */
        removeCookie('user');

        /**dispatch context */
        dispatch({type:'LOGOUT'})

        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})

    }

    return {logout}
}