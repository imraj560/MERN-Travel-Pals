import { AuthComponent } from "../../components/AuthComponent";
import { Container, Row, Col, Card, Image, Footers } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react";
import HomePlaceCard from "../../components/homecards/HomePlaceCard";
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import { MdOutlineRefresh } from "react-icons/md";
import './Find.css'

const Find = ()=>{
    const {place, dispatch} = UsePlaceContext();
    const[mapdata, setMapdata] = useState([]);
    const [loader, setLoader] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [locations, setLocations] = useState('');
    const [filterdata, setFilterdata] = useState(place);
    const [locationlist, setLocationlist] = useState([]);
    const [search, setSearch] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('')
   

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
               
                if(place !== null){

                    dispatch({type: 'SET_PLACE', payload: data})
                    setFilterdata(place)
                    setLoader(false)
                }
                
               

            }).catch((error)=>{

                console.log("The error is:", error)
            })
        }

        fetchApiData()


        const locationList = async()=>{
            const data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/location',{
            //const data = fetch('http://localhost:4000/api/place/location',{
                
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


    /**Refresh Fiter */

    const refreshFilter=()=>{

        setFilterdata(place)

    }

    /**Search Function */

    const onSearchChange = (event)=>{

        const searchFilterString = event.target.value.toLocaleLowerCase();
        setSearch(searchFilterString);

        
    }

     

    useEffect(()=>{
    
        if(place !== null){

            const filteredPlace = place.filter((single_place)=>{

            return single_place.title.toLocaleLowerCase().includes(search);


          })
    
            setFilterdata(filteredPlace) 

        }

        

        
    },[search, place]);

    
      /**Googel maps filter */    
      const mapFilter = (lat, lng) => {

        setLat(lat)
        setLng(lng)
   
        
    }

    useEffect(()=>{


      if(lat && lng !== ''){

        const markerData = place.filter((single_place)=>{

            return single_place.location_lat == lat && single_place.location_lng == lng;
        })

        setFilterdata(markerData)

      }


    },[lat,lng, place])


    useEffect(()=>{

        if(type !== ''){

            const typeData = place.filter((single_place)=>{

                return single_place.wtype == type;
            })

            setFilterdata(typeData)
        }

        

    },[type, place])

   

    return (

        <AuthComponent>

           

            <Container className="px -4 mt-5">
           
                <Row id="find_google_row">

                    <h2>Location of Visited Places</h2>
                    <p><span style={{fontWeight:'600', fontSize:'20px'}}>Click</span> on the location markers to find your ideal location</p>

                    <Map
                    style={{width: '100%', height: '50vh'}}
                    defaultCenter={{lat: 45.48556, lng: -73.62780}}
                    defaultZoom={5}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    >


                            {

                            filterdata && filterdata.map((singleMap, index)=>{
                                
                            return (
                            
                                <Marker
                                 key={index}
                                 position={{lat:Number(singleMap.location_lat), lng:Number(singleMap.location_lng)}} 
                                 clickable={true}
                                 onClick={() => mapFilter(singleMap.location_lat, singleMap.location_lng)}
                                 id="map"
                                 />
                            )
                            })     

                            }  

                    </Map>

                   
                   
                </Row>

             
                <Row id="find_filter_row"> 
                     <Col md={6}>
                        <label for="inputEmail4" class="form-label">Search name</label>
                        <input className='rounded m-0 w-100' placeholder="Search Location" style={{width:'100%', marginLeft:'0PX'}} required type="search" name="search" id="search" value={search} onChange={onSearchChange} class="form-control" />
                    </Col>
                   

                    <Col md={4} >
                        <label for="inputState" class="form-label">Vacation Type</label>
                        <select className='rounded m-0 w-100' required onChange={(e)=> setType(e.target.value)} class="form-select" style={{height:'45px', paddingLeft:'10PX'}}>
                        <option selected>Vacation Type</option>
                        <option value="vacation">Vacation</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="hiking">Hiking</option>
                        </select>
                    </Col>

                    <Col md={2} style={{padding:'0 2px'}}>
                       <Button id="refresh_sort" onClick={refreshFilter} type="submit">
                        <MdOutlineRefresh style={{marginRight:'5PX'}}/> 
                        RefreshSort</Button>
                    </Col>
                   
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
                <span style={{textAlign:'center', color:'red', fontSize:'12x', fontWeight:'550'}}>{message}</span>

                {
                    
                    filterdata && filterdata.map((singlePlace)=>{
           
                           return (
                           
                               <HomePlaceCard key={singlePlace._id} props={singlePlace} />
                           )
                       })            
                                   
                              
                   }

              
                 </Row>



            </Container>

        </AuthComponent>


    )
}

export default Find;