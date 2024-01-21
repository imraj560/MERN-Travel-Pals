import React, { useEffect } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { NavLink } from 'react-router-dom';
import './Exercise.css';

const Exercise = ()=>{

    /**We have used use state for local access of data */
    // const [workouts, setWorkout] = useState([]);

    /**Now lets invoke the reducers for global access */
    const {workouts, dispatch} = UseWorkoutsContext();

    /**Api call to get Workout Data */
    useEffect(()=>{

        const fetchApiData = async()=>{

            let data = await fetch('/api/workout/').then((response)=>{

                return response.json();

            }).then((data)=>{

                // setWorkout(data);
                //Now we dispatch the action to fill out workouts
                dispatch({type: 'SET_WORKOUTS', payload: data})

                console.log('Workout data', workouts);
            })
        }

        fetchApiData();

    }, [])
  
    return (

    
           <div id="exerciseContainer">

            <button><NavLink to="/add" style={{textDecoration:'none', color:'white'}}>Add Exercise</NavLink></button>

            
            {
                workouts && workouts.map((singleWorkout)=>{

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