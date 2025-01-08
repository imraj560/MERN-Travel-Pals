import { UseAuthContext } from "./UseAuthContext";
import { UsePlaceContext } from "./UsePlaceContext"; 
import { useState } from "react";
import { useCookies } from 'react-cookie';

export const UseLogOut = ()=>{
    const [user, setUser] = useState(null);
    const { dispatch } = UseAuthContext()
    const { dispatch : placeDispatch } = UsePlaceContext()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logout = ()=>{

        /**remove user from local storage */
        localStorage.removeItem('user');  

         /**Remove Cookie */
         const clearCookie = async () => {
            //await fetch("http://localhost:4000/auth/clear-cookie", {
            await fetch("https://mern-exercise-tracker-production.up.railway.app/auth/clear-cookie", {
              credentials: "include",
            });
            console.log("Cookie cleared");
          };

        clearCookie()  

        /**dispatch context */
        dispatch({type:'LOGOUT'})

        placeDispatch({type: 'SET_PLACE', payload: null})

    }

    return {logout}
}