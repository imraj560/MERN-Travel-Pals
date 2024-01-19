import React, { useState } from 'react';
import './Add.css';

const Add = ()=>{

    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');

    return (

    
           <div id="container">

                <div id="formContainer">

                    <p>Add Workout</p>

                    <form>
                        <input type="text" value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                        <input type="number" value={reps} name="reps" placeholder="Enter Reps" onChange={(e)=> setReps(e.target.value)} />
                        <input type="number" value={load} name="load" placeholder="Enter Weight" onChange={(e)=> setLoad(e.target.value)} />
                        <button type="submit">Create Workout</button>
                    </form>
                   
                </div>

           </div>
        
    )
}

export default Add;