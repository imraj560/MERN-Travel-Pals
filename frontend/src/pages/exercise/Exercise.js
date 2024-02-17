import React, { useEffect, useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { NavLink } from 'react-router-dom';
import './Exercise.css';
import WorkoutCard from '../../components/workoutcards/WorkoutCard';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';

const Exercise = ()=>{

    /**We have used use state for local access of data */
    // const [workouts, setWorkout] = useState([]);

    /**Now lets invoke the reducers for global access */
    const {workouts, dispatch} = UseWorkoutsContext();
    const [search, setSearch] = useState('');
    const [filteredWorkouts, setFilteredWorkouts] = useState()

    console.log('filtered Data', filteredWorkouts)
  

    const { user } = UseAuthContext()

    /**Api call to get Workout Data */
    useEffect(()=>{

        const fetchApiData = async()=>{

            let data = await fetch('/api/workout/profile',{

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                
                dispatch({type: 'SET_WORKOUTS', payload: data})
                setFilteredWorkouts(data)

            })
        }

        if(user){

             fetchApiData();
        }
       

    }, [dispatch])

    /**Search Functionality */
     const onSearchChange = (event)=>{

         const searchFilterString = event.target.value.toLocaleLowerCase();
         setSearch(searchFilterString);

     }

    useEffect(()=>{

        if(workouts !== null){

            const filteredWorkouts = workouts.filter((workout)=>{

            return workout.title.toLocaleLowerCase().includes(search);
        })

        setFilteredWorkouts(filteredWorkouts);


        }

        

        
    },[search, workouts]);

 
  
    return (

            <AuthComponent>

                 <div id="exerciseContainer">

                 <p style={{marginBottom:'25px', fontSize:'25px', fontWeight:'bold'}}>Hi {user.name}, <span style={{color:'gray',  fontSize:'15px', fontWeight:'bold'}}>Below are your workouts</span></p>


                <button><NavLink to="/add" style={{textDecoration:'none', color:'black'}}>Add Exercise</NavLink></button>
                <input type="search" value={search} id="search" onChange={onSearchChange} placeholder="Search Workout" />
               

                <div id='gridContainer'>
                
                    {
                    
                        
                        
                        filteredWorkouts && filteredWorkouts.map((singleWorkout)=>{

                            return (
                            
                                <WorkoutCard key={singleWorkout._id} props={singleWorkout} />
                            )
                        })
                    }

                </div>
                
                
                </div>

            </AuthComponent>
          


        
    )
}

export default Exercise;