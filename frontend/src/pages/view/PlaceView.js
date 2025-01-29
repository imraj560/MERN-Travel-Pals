import './PlaceView.css';
import { useState, useEffect, useRef } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import { Container, Row, Button, Col, Image, Form} from 'react-bootstrap';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import { FcLike, FcDislike } from "react-icons/fc";
import { format, set } from 'date-fns';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

import { useParams } from 'react-router-dom';

const PlaceView = ()=>{

    const {place, dispatch} = UsePlaceContext();
    const { id } = useParams();
    const [filteredData, setFilteredData] = useState([])
    const [gallery, setGallery] = useState([])
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [owner, setOwner] = useState('');
    const [load, setLoad] = useState(false);
    const messageRef = useRef(null);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);

    useEffect(()=>{
    
        //fitler context according to id

        if(place !== null){

            const filteredPlace = place.filter((singlePlace)=>{

                return singlePlace._id === `${id}`;
            })

          setOwner(filteredPlace[0].user_id )

          setFilteredData(filteredPlace)

        }
    
    
        }, [])

    /**Fetch Gallery Image */
    useEffect(()=>{

        const fetchApiData = async ()=>{

           

            //const data = fetch(`http://localhost:4000/api/place/gallery/${id}`, {
            const data = fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/gallery/${id}`, {

                method: 'GET',
                headers:{

                    'Content-Type' : 'application/json',
                   
                    
                }
            }).then((response)=>{

                return response.json()


            }).then((data)=>{

                setGallery(data)

                
              
            })
        }

        fetchApiData()

    },[])

    /**Send mail */
    const handleSubmit = async(e)=>{

        setLoad(true)

        e.preventDefault()

         const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/contact', {
         //const response = await fetch('http://localhost:4000/api/place/contact', {
        
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({subject, message, email, owner})
                })
        
                const json = await response.json();
        
                if(!response.ok){
                    
                    toast.warning(json.message)
                    setLoad(false)
                }
        
                if(response.ok){
                  
                    setLoad(false)
                    toast.success(json.message)
                    messageRef.current.value = "";
                    subjectRef.current.value = "";
                    emailRef.current.value = "";
                  
                }

        
    }

    return (

        <AuthComponent>

            <Container>
                <Row id='placeViewMap'>
                    <h2>Location Details</h2>
                    <p>Below are some Details</p>
                    <Map
                        style={{width: '100%', height: '50vh'}}
                        defaultCenter={{lat: 45.48556, lng: -73.62780}}
                        defaultZoom={5}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        > 
                        {
                            filteredData.map((singleMarker)=>{

                                return (

                                    <Marker
                                    position={{lat:Number(singleMarker.location_lat), lng:Number(singleMarker.location_lng)}} 
                                    clickable={true}
                                    id="map"
                                    />

                                )
                            })
                        }

                               

                    </Map>
                </Row>

                <Row id="about">
                    <Col md={5} id="about_col">

                        <h2 id='about_title'>About Place</h2>
                        <p>Something about the place</p>
                        {filteredData.map((singleData)=>{

                            return (
                                <>
                            
                                    <p id="place_title" style={{fontWeight:'600'}}>{singleData.title}</p>
                                    <p id="description"><FcLike style={{fontSize:'20PX'}}/> {singleData.likesCount} <FcDislike style={{marginLeft:'20PX',fontSize:"20PX"}}/> {singleData.dislikesCount}</p>
                                    <p id="description">{singleData.description}</p>
                                    <p id="description">Vist Date: {format(singleData.wdate, 'yyyy-dd-MM')}</p>
                                  
                                    
                                    
                                    
                                </>  
                                
                            )
                            })}

                        <h2 id="contact_traveller">Contact</h2>

                        <Form style={{padding:"0px"}} onSubmit={handleSubmit}>

                        <Row>
                            <Col md={6}>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{marginLeft:'0px'}}>Email</Form.Label>
                                <Form.Control required type="email" ref={emailRef} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
                                <Form.Text className="text-muted">
                                Your Email is private with us
                                </Form.Text>
                                </Form.Group>

                            </Col>

                            <Col md={6}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{marginLeft:'0px'}}>Subject</Form.Label>
                            <Form.Control type="text" ref={subjectRef} required name="subject" onChange={(e)=>setSubject(e.target.value)} placeholder="Enter Subject" />
                            <Form.Text className="text-muted">
                            What do you want to ask about?
                            </Form.Text>
                            </Form.Group>
                            </Col>
                        </Row>    

                      

                      

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{marginLeft:'0px'}}>Message</Form.Label>
                            <Form.Control required type="text" ref={messageRef} name="message" onChange={(e)=>setMessage(e.target.value)} placeholder="mention your message" />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{background:"black", color:'white', width:'100%'}}>
                        {!load && ('Send Message')}{load && (<Spinner size="sm" variant='warning' animation="border" style={{marginTop:'4px'}} />)}
                        </Button>
                        </Form>
                        

                    </Col>

                    <Col md={7}>
                        <Row id="image_gallery">


                        { 

                                gallery && gallery.length > 0 ? ( gallery.map((single_image)=>{

                                    return (
                                        
                                        <Col id="image_col" style={{padding:'2px', height:"400px"}} md={12} lg={6} sm={12}>
                                        <Image id="view_image"  height='100%' width="100%" src={"http://localhost:4000/api/place/download/"+single_image.image} />
                                        </Col>
                                    )
                                })) : (<p style={{fontSize:'20PX', borderRadius:'5px', padding:'10px'}}>! Traveller has not added any image to Gallery</p>)
                                
                                
                                }

                        


                            </Row>
                    </Col>
                </Row>

               


              

              

            </Container>
            
        </AuthComponent>
       
    )
}

export default PlaceView;