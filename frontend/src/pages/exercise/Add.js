import React, { useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import './Add.css';

const Add = ()=>{

    const {dispatch} = UseWorkoutsContext();

    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e)=>{

        e.preventDefault();
        
        const workout = {title, load, reps};

        const response = await fetch('/api/workout/', {

            method: 'POST',
            body: JSON.stringify(workout),

            headers:{
                'Content-Type': 'application/json'
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

            dispatch({type:'CREATE_WORKOUTS', payload: json});

            alert('New Workout added', json);
        }

    }

    return (

    
           <div id="container">

                <div id="formContainer">

                    <p>Add Workout</p>

                    <form onSubmit={handleSubmit}>
                        <input type="text" required value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                        <input type="number" required value={reps} name="reps" placeholder="Enter Reps" onChange={(e)=> setReps(e.target.value)} />
                        <input type="number" required value={load} name="load" placeholder="Enter Weight" onChange={(e)=> setLoad(e.target.value)} />
                        <button type="submit">Create Workout</button>
                    </form>
                   
                </div>

           </div>
        
    )
}

export default Add;