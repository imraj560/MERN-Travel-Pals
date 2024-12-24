import { AuthComponent } from "../../components/AuthComponent";
import { Container, Row, Col, Card, Image, Footers } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react";
import HomeWorkoutCard from "../../components/homecards/HomeWorkoutCard";
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { format, set } from 'date-fns';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import './Find.css'

const Find = ()=>{
    const {workouts, dispatch} = UseWorkoutsContext();
    const [loader, setLoader] = useState(false);
    const [sdate, setSdate] = useState('');
    const [fdate, setFdate] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [locations, setLocations] = useState('');
    const [filterdata, setFilterdata] = useState(workouts);
    const [locationlist, setLocationlist] = useState([]);
   

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
               
                dispatch({type: 'SET_WORKOUTS', payload: data})
                setFilterdata(workouts)
                setLoader(false)
               

            }).catch((error)=>{

                console.log("The error is:", error)
            })
        }

        fetchApiData()


        const locationList = async()=>{
            const data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/location',{
            //const data = fetch('http://localhost:4000/api/workout/location',{
                
                method: 'GET',

                header: {

                    'Content-Type':'application/json'
                }


            }).then((response)=>{

                return response.json()

            }).then((data)=>{
               
                
               setLocationlist(data)

            }).catch((error)=>{

                console.log("The error is:", error)
            })


            
        }

        locationList()





    }, [])

    /**Filter starts from here */

    const handleFilter = (e)=>{

        setLoader(true)

        e.preventDefault();
     

        if(workouts !== null ){

             const newFilter = workouts.filter((workout)=>{

                const workoutDate = format(workout.wdate, 'yyyy-MM-dd')  
               
                return workout.wtype == type  && workout.location == locations && workoutDate >= sdate && workoutDate <= fdate;

             })

             if(newFilter == ''){
               
              setLoader(false)
              setMessage('Nobody with your schedule')
              setTimeout(() => {
                setMessage('');
              }, 2000);

              return;

             }else{

                 setLoader(false)
                 setMessage('')
                 dispatch({type: 'SET_WORKOUTS', payload: newFilter})
             }

            
        }

      

    }



    return (

        <AuthComponent>

           

            <Container className="px -4 mt-5">
           
                <Row>

                    <p>Recent Workout Places</p>

                    <Map
                    style={{width: '100vw', height: '50vh'}}
                    defaultCenter={{lat: 45.48556, lng: -73.62780}}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    />

                    <Marker
                    position={{lat :45.49548909989325, lng: -73.57798567418627}}
                    clickable={true}
                    />

                    <Marker
                    position={{lat:45.5024672813017, lng: -73.56973598768127}}
                    clickable={true}
                    />
                   
                </Row>

                <form onSubmit={handleFilter} style={{padding:'0px'}}> 
                <Row style={{padding:'20px 0px', width:'100%'}}> 
                     <Col md={2} style={{padding:'0 2px'}}>
                        <label for="inputEmail4" class="form-label">From</label>
                        <input required type="date" value={sdate} onChange={(e)=> setSdate(e.target.value)} class="form-control" id="inputEmail4" />
                    </Col>
                    <Col md={2} style={{padding:'0 2px'}}>
                        <label for="inputEmail4" class="form-label">To</label>
                        <input value={fdate} onChange={(e)=> setFdate(e.target.value)} required type="date" class="form-control" id="inputEmail4" />
                    </Col>
                    <Col md={3} style={{padding:'0 2px'}} id="location">
                        <label for="inputState" class="form-label">Choose Location</label>
                        <select required id="inputState" onChange={(e)=> setLocations(e.target.value)} class="form-select" style={{height:"53px"}}>
                        <option selected>Choose Location</option>
                        {
                            locationlist && locationlist.map((singleLocation)=>{

                                return (

                                     <option value={singleLocation._id}>{singleLocation._id}</option>
                                )
                            })
                        }
                        
                        </select>
                    </Col>

                    <Col id='type' md={3} style={{padding:'0 2px'}} >
                        <label for="inputState" class="form-label">Workout Type</label>
                        <select required id="inputState" onChange={(e)=> setType(e.target.value)} class="form-select" style={{height:'53px'}}>
                        <option selected>Workout Type</option>
                        <option value="cardio">Cardio</option>
                        <option value="calesthenics">Calisthenics</option>
                        <option value="weight">Weight Trainning</option>
                        </select>
                    </Col>

                    <Col md={2} style={{padding:'0 2px'}}>
                       <Button type="submit" style={{width:'100%', marginTop:'31px',height:'53px'}}>Filter</Button>
                    </Col>
                   
                </Row>
                </form>

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


                <Row className='mt-5'>
                <span style={{textAlign:'center', color:'red', fontSize:'12x', fontWeight:'550'}}>{message}</span>

                {
                    
                    workouts && workouts.map((singleWorkout)=>{
           
                           return (
                           
                               <HomeWorkoutCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
                 </Row>



            </Container>

        </AuthComponent>


    )
}

export default Find;