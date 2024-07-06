import { useEffect, useState } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import HomeWorkoutCard from '../../components/homecards/HomeWorkoutCard';
import './Home.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Home = ()=>{

    const [workouts, setWorkouts] = useState('');
    const [loader, setLoader] = useState(true);

    useEffect(()=>{

        const fetchApiData = async()=>{

                const data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/home',{
                //const data = await fetch('http://localhost:4000/api/workout/home',{

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

        <Container className='mt-3'>
            <Row>
                <Col id="banner" md={12}>
                    <h2>Wondering what your friends been working on?</h2>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col md={12} className='text-center' style={{lineHeight:'30px'}}>
                    <p>Hi :), <br/> I am Raju, fitness has alaways been a priority for me other than my main profession, because
                        I know everything is connected to it, if your body is not fit, then your mind will follow suit and
                        nothing in life will make sense. So no matter what i do I alaways remind myself of my identity by taking
                        care of my body which i believe gives me back in return to my soul and well being.
                    </p>
                </Col>
            </Row>

            <Row className='mt-5'>
                <p>Recent Activities</p>
              

                {
                    
                    workouts && workouts.map((singleWorkout)=>{
           
                           return (
                           
                               <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
            </Row>
           

        {loader &&  (

            <Button variant="default" disabled>
            <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            Loading...
            </Button>
        )}
   
 
        </Container>    

         
        </AuthComponent>
       
       
    )
}

export default Home;