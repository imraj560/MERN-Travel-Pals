import { useEffect, useState } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import HomeWorkoutCard from '../../components/homecards/HomeWorkoutCard';
import './Home.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Alarm, PeopleFill, PersonArmsUp } from 'react-bootstrap-icons';

const Home = ()=>{

    const [workouts, setWorkouts] = useState([]);
    const [recdata, setRecdata] = useState([]);
    const [cardio, setCardio] = useState([]);
    const [cal, setCal] = useState([]);
    const [weight, setWeight] = useState([]);
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
                setRecdata(data.slice(0,4))
                
                setLoader(false)
                console.log('Workout Data', workouts)

            }).catch((error)=>{

                console.log("The error is:", error)
            })
        }

        fetchApiData()

    }, [])

    useEffect(()=>{

        const cardioData = workouts.filter((workout)=>{
          
        return workout.wtype.toLowerCase().includes('cardio');
      
        })
      
    setCardio(cardioData.slice(0 ,4));

    const calData = workouts.filter((workout)=>{
        
        return workout.wtype.toLowerCase().includes('calesthenics');
        
        })
        
        setCal(calData.slice(0 ,4));


    const weightData = workouts.filter((workout)=>{
    
        return workout.wtype.toLowerCase().includes('weight');
        
        })
        
        setWeight(weightData.slice(0 ,4));

        
      
        
      
        
      
       },[workouts])
      
       

    return (
        <AuthComponent>

        <Container className='mt-3'>
            <Row>
                <Col id="banner" md={12}>
                    <h2>Find a workout buddy who matches your schedule</h2>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col md={12} className='text-center' style={{lineHeight:'30px'}}>
                    <p>Hi :), <br/> I am Raju, fitness has alaways been a priority for me other than my main profession, because
                        I know everything is connected to it, if your body is not fit, then your mind will follow suit and
                        nothing in life will make sense. This app will help you find people around you who has the same workout routine as yours
                    </p>
                </Col>
            </Row>

            <Row style={{padding:'30px 0px'}}>
                <Col md={4} style={{textAlign:'center', padding:'20px 0px'}}>
                    <Alarm style={{fontSize:"40PX"}} />
                    <p>Sync Time</p>
                </Col>
                <Col md={4} style={{textAlign:'center', padding:'20px 0px'}}>
                <PeopleFill style={{fontSize:"40PX"}} />
                <p>Find Community</p>
                </Col>
                <Col md={4} style={{textAlign:'center', padding:'20px 0px'}}>
                <PersonArmsUp style={{fontSize:"40PX"}} />
                <p>Workout Buddy</p>
                </Col>
                
            </Row>

            <Row className='mt-5'>
                <p>Recent Schedule</p>
              

                {
                    
                    recdata && recdata.map((singleWorkout)=>{
           
                           return (
                           
                               <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
            </Row>

            <Row className='mt-5'>
                <p>Cardio</p>
              

                {
                    
                    cardio && cardio.map((singleWorkout)=>{
           
                           return (
                           
                               <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
            </Row>

            <Row className='mt-5'>
                <p>Weights</p>
              

                {
                    
                    weight && weight.map((singleWorkout)=>{
           
                           return (
                           
                               <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
            </Row>


            <Row className='mt-5'>
                <p>Calisthenics</p>
              

                {
                    
                    cal && cal.map((singleWorkout)=>{
           
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