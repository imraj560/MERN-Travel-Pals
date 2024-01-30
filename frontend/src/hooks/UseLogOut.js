import { UseAuthContext } from "./UseAuthContext";

export const UseLogOut = ()=>{

    const { dispatch } = UseAuthContext()

    const logout = ()=>{

        /**remove user from local storage */
        localStorage.removeItem('user');

        /**dispatch context */
        dispatch({type:'LOGOUT'})

    }

    return {logout}
}