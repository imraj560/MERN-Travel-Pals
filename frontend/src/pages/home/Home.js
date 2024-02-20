import { useEffect, useState } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import HomeWorkoutCard from '../../components/homecards/HomeWorkoutCard';

import './Home.css';

const Home = ()=>{

    const [workouts, setWorkouts] = useState('');

    useEffect(()=>{

        const fetchApiData = async()=>{


            // const data = await fetch('https://exercise-tracker-ax8o.onrender.com/api/workout/home',{

            const data = await fetch('/api/workout/home',{

                method: 'GET',

                header: {

                    'Content-Type':'application/json'
                }

            }).then((response)=>{

                return response.json()

            }).then((data)=>{

                setWorkouts(data)

                console.log('Workout Data', workouts)

            }).catch((error)=>{

                console.log("The error is:", error)
            })
        }

        fetchApiData()

    }, [])

    return (
        <AuthComponent>

         <div id="banner">
            <p>What your friends are Working on?</p>
        </div>

         <section id="day_title">
            <p>
                See What your friends been upto
            </p>
        </section>

        <section id="workout_profiles_grid">

        {
                    
         workouts && workouts.map((singleWorkout)=>{

                return (
                
                    <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                )
            })            
                        
                   
        }

        </section>

        </AuthComponent>
       
       
    )
}

export default Home;