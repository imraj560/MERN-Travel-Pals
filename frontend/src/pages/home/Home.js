import { useEffect, useState } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import HomeWorkoutCard from '../../components/homecards/HomeWorkoutCard';
import { Oval } from 'react-loader-spinner'
import { ExclamationTriangle } from 'react-bootstrap-icons';
import './Home.css';

const Home = ()=>{

    const [workouts, setWorkouts] = useState('');
    const [loader, setLoader] = useState(true);

    useEffect(()=>{

        const fetchApiData = async()=>{


            // const data = await fetch('https://exercise-tracker-ax8o.onrender.com/api/workout/home',{

            const data = await fetch('https://exercise-tracker-ax8o.onrender.com/api/workout/home',{

                method: 'GET',

                header: {

                    'Content-Type':'application/json'
                }

            }).then((response)=>{

                return response.json()

            }).then((data)=>{

                setWorkouts(data)
                
                setLoader(false)
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

        <section id="message">
            <p><ExclamationTriangle size={20}/>Version 1.0 Image upload is awaiting paid disk space service on render.com API</p>
        </section>

         <section id="day_title">
            <p>
                See What your friends been upto
            </p>
        </section>

       

        {loader &&  (

        <Oval
        visible={true}
        height="80"
        width="80"
        color="black"
        margin="auto"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
        />
        )}
        

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