import { useState } from "react"
import {toast} from 'react-toastify'
import { UseAuthContext } from "./UseAuthContext";
import { UseWorkoutsContext } from "./UseWorkoutsContext";


export const useDislike = () =>  {

    const [errorr, setErrorr] = useState(null);
    const { user } = UseAuthContext()
    const {workouts, dispatch} = UseWorkoutsContext();
    const [lloading, setLLoading] = useState(null)

    const dislike = async(postId)=>{

        setLLoading(true)

        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/dislike',{
        //const response = await fetch('http://localhost:4000/api/workout/dislike', {

            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${user.token}`},
            body: JSON.stringify({postId})
        })

        const json = await response.json();

        if(!response.ok){

            setErrorr(json.error)
        }

        if(response.ok){

            setErrorr(null);

            // console.log('WDATA',json.workoutArray)

            dispatch({type:'UPDATE_WORKOUT', payload: json.workoutArray});

            // console.log('updated workout state', json.workoutArray)
            
            toast.success(json.message)

            setLLoading(false)
        }
    }

    return {dislike, errorr, lloading}


}