import { UseAuthContext } from "./UseAuthContext";
import { UseWorkoutsContext } from "./UseWorkoutsContext"; 

export const UseLogOut = ()=>{

    const { dispatch } = UseAuthContext()
    const { dispatch : workoutsDispatch } = UseWorkoutsContext()

    const logout = ()=>{

        /**remove user from local storage */
        localStorage.removeItem('user');

        /**dispatch context */
        dispatch({type:'LOGOUT'})

        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})

    }

    return {logout}
}