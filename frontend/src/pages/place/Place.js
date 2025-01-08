import React, { useEffect, useState } from 'react';
import LineChart from '../../components/charts/LineChart';
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import { NavLink } from 'react-router-dom';
import './Place.css';
import PlaceCard from '../../components/placecard/PlaceCard';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { PlusCircle, EmojiSmile, Filter } from 'react-bootstrap-icons';
import { FcLike, FcDislike } from "react-icons/fc";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';



const Place = ()=>{

    /**We have used use state for local access of data */
    // const [workouts, setWorkout] = useState([]);

    /**Now lets invoke the reducers for global access */
    const {place, dispatch} = UsePlaceContext();
    const [search, setSearch] = useState('');
    const [filteredPlace, setFilteredPlace] = useState(place)
    const [filterTags, setFilterTags] = useState([]);
    const [loader, setLoader] = useState(true);
    const [likes, setLikes] = useState('');
    const [dislikes, setDislikes] = useState('');
    const [chartdata, setChartdata] = useState([])
    const { user } = UseAuthContext()


    /**Get plse data */
    useEffect(()=>{

        const fetchApiData = async()=>{

            let data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/profile',{ 
            //let data = await fetch('http://localhost:4000/api/place/profile',{     

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                dispatch({type: 'SET_PLACE', payload: data})
                console.log('placecontextdata', place)
                setLoader(false)
               console.log('UserProfile',data)

            })
        }

        /**total likes and dislikes */

        const fetchtotalReactions = async()=>{

            let data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/total',{ 
            //let data = await fetch('http://localhost:4000/api/place/total',{     

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

               
               console.log('Reactions',data[0].totalLikeslength)
                    
               setLikes(data[0].totalLikeslength)
               setDislikes(data[0].totalDislikeslength)

            }).catch((error)=>{

                console.log(error)
            })
        }

        if(user){

             fetchApiData();
             fetchtotalReactions();
        }

        /**Get total types */
        const typesData = async()=>{

            let data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/types',{ 
            //let data = await fetch('http://localhost:4000/api/place/types',{     

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                setChartdata(data.arrayData)

            })
        }

        typesData()

     
       

    }, [dispatch])

    /**Search Functionality */
     const onSearchChange = (event)=>{

         const searchFilterString = event.target.value.toLocaleLowerCase();
         setSearch(searchFilterString);

     }

    useEffect(()=>{

        if(place !== null){

            const filteredPlace = place.filter((single_place)=>{

            return single_place.title.toLocaleLowerCase().includes(search);
        })

        setFilteredPlace(filteredPlace);


        }

        

        
    },[search, place]);

    const onCheckChange = (event) => {

        if(event.target.checked){
      
          setFilterTags((prev)=>[...prev,event.target.value]);
      
          
        }else{
      
          setFilterTags(
            filterTags.filter((filterTag) => filterTag !== event.target.value)
          )
      
        }
      
      }


      useEffect(() => {

        if(place !== null){
        
        const newCheckedPlace = place.filter((single_place) =>
          filterTags.length > 0
            ? filterTags.some((filterTag) => single_place.wtype.includes(filterTag))
            : place
        );

        setFilteredPlace(newCheckedPlace);

    }

      }, [filterTags, place]);



 
  
    return (

    <AuthComponent>

   

     <Container className='mt-5'>

        <Row>
            <Col id="profile_header" md={12}>
                <h2>Profile</h2>
            <p><NavLink style={{textDecoration:'none', color:'black'}} to={'/'}>Hi {user.name} <EmojiSmile/></NavLink></p>
            </Col>
        </Row>

        <Row className='mt-5'>

            <Col id='profileCol1' md={3} style={{boxSizing:"border-box"}}>

              
                    <Button id="profile_add_button" variant="secondary" size="lg" style={{width:'100%'}}>
                    <NavLink to="/add" style={{textDecoration:'none', color:'white'}}><PlusCircle/> Add </NavLink>
                    </Button> 
                
                     <Button variant="default" style={{width:"50%", borderRadius:"0px"}}>
                    <FcDislike style={{fontSize:'20px'}} /> {loader && (<Spinner size='sm' animation="border" variant="warning" />)} {likes}
                    <span className="visually-hidden">unread messages</span>
                 </Button>

                    <Button variant="default" style={{width:'50%', borderRadius:'0px'}}>
                    <FcDislike style={{fontSize:'20px'}}/>{loader && (<Spinner size='sm' animation="border" variant="warning" />)} {dislikes}
                    <span className="visually-hidden">unread messages</span>
                    </Button> 
                
              

            </Col>

            <Col id='profileCol2' md={9}>

                <Tabs
                    defaultActiveKey="home"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="home" title="Main">

                          <h2 style={{marginTop:"20px", fontWeight:"600", fontSize:"25PX", marginBottom:"30px"}}>Filter</h2>   
                        <Form className='m-0 p-0'>
                            <Form.Group controlId="exampleForm.ControlInput1" className='w-100'>
                                <Form.Control className='rounded m-0 w-100' type="search" value={search} id="search" onChange={onSearchChange} placeholder="Search Workout" />
                            </Form.Group> 
                            </Form>

                            <Form className='mt-3 p-0'>
                            <div key="inline-checkbox">
                            <Filter className='float-start'/><br />
                            <Form.Check
                                inline
                                label="Vacation"
                                onChange={onCheckChange}
                                value="vacation"
                            
                            />
                            <Form.Check 
                                inline
                                label="Restaurant"
                                onChange={onCheckChange}
                                value="restaurant"
                            />
                            <Form.Check
                                inline
                                label="Hiking"
                                onChange={onCheckChange}
                                value="hiking"
                            
                            />
                            </div>
                
                        </Form>

                        {!loader && <Row id="profileDisplay" className='w-100'>
                            
                            {
                            
                                
                                
                                filteredPlace && filteredPlace.map((singlePlace)=>{

                                    return (
                                    
                                        <PlaceCard key={singlePlace._id} props={singlePlace} />
                                    )
                                })
                            }

                         </Row>}
                       
                    </Tab>


                    <Tab eventKey="profile" title="Trends">

                         <h2 style={{marginTop:"20px", fontWeight:"600", fontSize:"25PX", marginBottom:"30px"}}>Current Trend</h2>
                        {/**Line starts here */}
                        <LineChart chartdata={chartdata}/>

                    </Tab>

                    <Tab eventKey="longer-tab" title="Map">

                    <h2 style={{marginTop:"20px", fontWeight:"600", fontSize:"25PX", marginBottom:"30px"}}>All Your Visited Locations</h2>
                    <Map
                    style={{width: '100%', height: '50vh'}}
                    defaultCenter={{lat: 45.48556, lng: -73.62780}}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    >


                            {

                            place && place.map((singleMap, index)=>{
                                
                            return (
                            
                                <Marker
                                 key={index}
                                 position={{lat:Number(singleMap.location_lat), lng:Number(singleMap.location_lng)}} 
                                 clickable={true}
                                 />
                            )
                            })     

                            }  

                    </Map>   
                    
                    </Tab>
                   
                </Tabs>
                        
                        

            </Col>

        </Row>
       
       

        <Row>

            <Col md={3} style={{padding:"5px"}}>

           

         


            </Col>

            <Col md={9}>

           

            </Col>
            
        </Row>    

       


    </Container>   


    </AuthComponent>
    
        
    )
}

export default Place;