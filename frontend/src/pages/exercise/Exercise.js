import React, { useEffect } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { NavLink } from 'react-router-dom';
import './Exercise.css';
import WorkoutCard from '../../components/workoutcards/WorkoutCard';
import { ToastContainer } from 'react-toastify';

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

            <button><NavLink to="/add" style={{textDecoration:'none', color:'black'}}>Add Exercise</NavLink></button>

            <div id='gridContainer'>
               
                 {
                workouts && workouts.map((singleWorkout)=>{

                    return (
                       

                        <WorkoutCard props={singleWorkout} />
                    )
                })
            }
            </div>
            
           

           


                
           </div>


        
    )
}

export default Exercise;