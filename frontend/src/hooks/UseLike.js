import { useState } from "react"
import {toast} from 'react-toastify'
import { UseAuthContext } from "./UseAuthContext";
import { UsePlaceContext } from "./UsePlaceContext";


export const useLike = () =>  {

    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const { user } = UseAuthContext()
    const {place, dispatch} = UsePlaceContext();
    const [loading, setLoading] = useState(null)
   


    const like = async(postId)=>{

        setLoading(true)

        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/like',{
        //const response = await fetch('http://localhost:4000/api/place/like', {

            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${user.token}`},
            body: JSON.stringify({postId})
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error)
        }

        if(response.ok){
            setError(null);

            // console.log('WDATA',json.placeArray)

            dispatch({type:'UPDATE_PLACE', payload: json.placeArray});
            
            toast.success(json.message)

            setLoading(false)

            
        }
    }

    return {like,error,loading}


}