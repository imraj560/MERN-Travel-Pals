import  {UseAuthContext } from '../hooks/UseAuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const UseSignUp = ()=>{

    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(null);
    const{dispatch} = UseAuthContext();
    const navigate = useNavigate()

    const signup = async(name, email, password)=>{

        setLoading(true)
        setError(null)
       
        const response = await fetch('http://localhost:4000/api/user/signup', {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
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
            navigate('/')
        }

    }

    return {signup, loading, error}
}