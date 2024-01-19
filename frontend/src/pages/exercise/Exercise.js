import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Exercise.css';

const Exercise = ()=>{

    const [workout, setWorkout] = useState([]);

    /**Api call to get Workout Data */
    useEffect(()=>{

        const fetchApiData = async()=>{

            let data = await fetch('/api/workout/').then((response)=>{

                return response.json();

            }).then((data)=>{

                setWorkout(data);

                console.log('Workout data', workout);
            })
        }

        fetchApiData();

    }, [])
  
    return (

    
           <div id="exerciseContainer">

            <button><NavLink to="/add" style={{textDecoration:'none', color:'white'}}>Add Exercise</NavLink></button>

            
            {
                workout && workout.map((singleWorkout)=>{

                    return (
                        <ul>
                            <li>{singleWorkout.title}</li>
                            <li>{singleWorkout.load}</li>
                            <li>{singleWorkout.reps}</li>
                        </ul>
                    )
                })
            }


                
           </div>


        
    )
}

export default Exercise;