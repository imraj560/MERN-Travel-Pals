import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import './EditForm.css';

const EditForm = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const params = useParams();

    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const { user } = UseAuthContext();

    

    useEffect(()=>{

        const apiDataFetch = async()=>{

            const data = await fetch(`/api/workout/${params.id}`, {

                  headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                setTitle(data.title);
                setLoad(data.load);
                setReps(data.reps);

            })

        }

        if(user){

             apiDataFetch();
        }

           
        

        

    },[])

    const handleSubmit = async(e)=>{

        e.preventDefault();

        if(!user){

            return
        }
        
        const workout = {title, load, reps};

        const response = await fetch(`/api/workout/${params.id}`, {

            method: 'PATCH',
            body: JSON.stringify(workout),

            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error);
        }

        if(response.ok){

            setError(null);
            setTitle('');
            setLoad('');
            setReps('');

            dispatch({type:'UPDATE_WORKOUT', payload: json});

            navigate('/exercise');
        }

    }

    return (

    
           <div id="container">

                <div id="formContainer">

                    <p>Edit Workout</p>

                    <form onSubmit={handleSubmit}>
                        <input type="text" required value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                        <input type="number" required value={reps} name="reps" placeholder="Enter Reps" onChange={(e)=> setReps(e.target.value)} />
                        <input type="number" required value={load} name="load" placeholder="Enter Weight" onChange={(e)=> setLoad(e.target.value)} />
                        <button type="submit">Save changes</button>
                    </form>
                   
                </div>

           </div>
        
    )
}

export default EditForm;