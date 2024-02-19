import  {UseAuthContext } from '../hooks/UseAuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

export const UseLogin = ()=>{

    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(null);
    const{dispatch} = UseAuthContext();
    const navigate = useNavigate();

    const login = async(email, password)=>{

        

        setLoading(true)
        setError(null)
       
        const response = await fetch('https://exercise-tracker-ax8o.onrender.com/api/user/login', {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error)
            setLoading(false)
        }

        if(response.ok){
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload:json})
            toast.success('Successfully Logged In')
            navigate('/')
        }

    }

    return {login, loading, error}
}