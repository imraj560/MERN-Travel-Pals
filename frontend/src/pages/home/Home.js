import { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../components/AuthComponent';
import HomePlaceCard from '../../components/homecards/HomePlaceCard';
import { Container, Row, Col, Card, Image, } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import User2 from '../../../src/assets/images/user2.jpeg'
import User1 from '../../../src/assets/images/user1.jpeg'
import User3 from '../../../src/assets/images/user3.jpg'
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {APIProvider, Map, MapCameraChangedEvent, Marker, APILoadingStatus, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';
import { FaMountainSun } from "react-icons/fa6";
import { GiTreeBranch } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import imageOne from '../../../src/assets/images/imageOne.jpg'
import imageTwo from '../../assets/images/imageTwo.jpg'
import imageThree from '../../assets/images/imageThree.jpg'
import bangladesh from '../../assets/images/bangladesh.jpg'
import turkey from '../../assets/images/turkey.jpg'
import scotland from '../../assets/images/scotland.jpg'
import { FaCity } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { format, set } from 'date-fns';

import './Home.css';



const Home = ()=>{

   
    const [recdata, setRecdata] = useState([]);
    const [freshData, setFreshData] = useState([]);
    const[mapdata, setMapdata] = useState([]);
    const [cardio, setCardio] = useState([]);
    const [cal, setCal] = useState([]);
    const [weight, setWeight] = useState([]);
    const [loader, setLoader] = useState(true);
    const {place, dispatch} = UsePlaceContext();
    const {user, dispatch:authDispatch} = UseAuthContext();

    
    

    const navigate = useNavigate()

    useEffect(()=>{

        
        if (!user) {

            let fetchGoogle = async()=>{

            let data = await fetch("https://mern-exercise-tracker-production.up.railway.app/auth/protected", {
            //let data = await fetch("http://localhost:4000/auth/protected", {

                credentials: "include",
              })
                .then((res) => res.json())
                .then((data) => {
                    
                    const userr = {"name":data.user.username, "email":data.user.email, "token":data.user.token}
                    console.log(userr)
                    authDispatch({type: 'LOGIN', payload:userr})
                  
                    

                }).catch((error)=>{

                    console.log(error)
                })  
           
            }

            fetchGoogle()

         
        }



    }, [])


    /**Fetch all Places */
    useEffect(()=>{


        const fetchApiData = async()=>{

               const data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/home',{
               //const data = await fetch('http://localhost:4000/api/place/home',{

                method: 'GET',

                header: {

                    'Content-Type':'application/json'
                }

            }).then((response)=>{

                return response.json()

            }).then((data)=>{
               
                dispatch({type: 'SET_PLACE', payload: data})
                setLoader(false)
               

            }).catch((error)=>{

                console.log("The error is:", error)
            })
        }

        fetchApiData()





    }, [])

    /**Fetch google map markers */

    useEffect(()=>{

        if(place !== null){

            setRecdata(place.slice(0,12))
            setFreshData(place.slice(0,2))
            setMapdata(place);
          
        } 
      
       },[place])


       const mapStyles = [
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#000000" }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{ "color": "#f2f2f2" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#ffffff" }]
        }
      ]

       
       

    return (
        <AuthComponent>

        <Container>
            <Row id="banner"></Row>


            <Row id="call_one">

                <Col md={6} id="call_one_heading">

                <h1>Share your memories with others</h1>

                </Col>

                <Col md={6} id="call_one_text">

                 <p>Discover Variety of places to visit. Register now to share your memories and access to other places</p>
                 <Button id="button_one"><NavLink style={{textDecoration:'none', color:'white'}} to="/signup">Join</NavLink></Button> 
                 <Button id="button_two"><NavLink style={{textDecoration:'none', color:'black'}} to="/find">Find</NavLink></Button>
                 

                </Col>
               
                
            </Row>

            <Row id="explore">

                <p>Explore</p>
                <h2>Discover The Perfect Place For You To Visit Today</h2>
                <p>Our community offers various places to visit. From the rural places of Malaysia to blue seas of the Carribean. We have places listed for
                    everyone
                </p>

            </Row>

            <Row id="service">

                <Col class="service_col" md={6} sm={12} lg={4}>
                <Image src={imageOne} fluid style={{borderRadius:'7PX'}} />
                <FaMountainSun style={{fontSize:'40px', marginBottom:'15px', marginTop:'20px'}}/>
                <h2 class="service_heading">Beautiful Mountains To Hike</h2>
                <p>Boost your endurance and cardiovascular health with our beautiful hiking session</p>
                </Col>

                <Col class="service_col" md={6} sm={12} lg={4}>
                <Image src={imageTwo} fluid style={{borderRadius:'7PX'}} />
                <GiTreeBranch style={{fontSize:'40px', marginBottom:'15px', marginTop:'20px'}}/>
                <h2 class="service_heading">Lush Green Vegetation To Stroll</h2>
                <p>Places like Bangladesh will really change your perspective of beauty</p>
                </Col>

                <Col class="service_col" md={6} sm={12} lg={4}>
                <Image src={imageThree} fluid style={{borderRadius:'7PX'}} />
                <IoIosWater style={{fontSize:'40px', marginBottom:'15px', marginTop:'20px'}}/>
                <h2 class="service_heading">Amazing Nature Around You</h2>
                <p>Have you even been to the mountains of British Columbia, truly amazing</p>
                </Col>

                
            </Row>

            <Row id="service_button_row">
                <Button id="service_button"><NavLink style={{textDecoration:'none', color:'white'}} to="/find">Find A Place</NavLink></Button>
            </Row>

            <Row id="explore">
                <p>Gallery</p>
                <h2>We Have A Collection Of Amazing Places For You</h2>
                <p>We have an amazing collection of places which people of all around the world has posted</p>
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

            <Row className='mt-5'>
              

                {
                    
                     recdata.map((singleWorkout)=>{
           
                           return (
                           
                               <HomePlaceCard key={singleWorkout._id} props={singleWorkout} />
                           )
                       })            
                                   
                              
                   }

              
            </Row>



   

            <Row id="map_title_div">

                <Col md={6}>
                    <h2 id="map_title_heading">Explore and Find More Places</h2>
                    <p style={{marginBottom:'0px'}}>All your recently updated Locations</p>
                </Col>

                <Col md={6} style={{height:'100%', marginTop:'auto'}}>

                <Button id="map_title_button" style={{width:'20%', float:'end'}}><NavLink style={{textDecoration:'none', color:'white'}} to="/find">Gallery</NavLink></Button>

                </Col>
                

            </Row> 

           

           

      
   
 
        </Container>

       

       
               

         
        </AuthComponent>
       
       
    )
}

export default Home;