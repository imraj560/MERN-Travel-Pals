import React, { useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify'
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import { ArrowLeft, ExclamationCircleFill } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import './Add.css';

const Add = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const { user } = UseAuthContext()

    const [title, setTitle] = useState('');
    const[file, setFile] = useState('')
    const [wdate, setWdate] = useState('');
    const [wtype, setWtype] = useState('');
    const [location, setLocation] = useState('');
    const [location_lng, setLocation_lng] = useState('');
    const [location_lat, setLocation_lat] = useState('')
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleForm = async(e)=>{

        e.preventDefault();

        setLoader(true)

        if(!user){

            return
        }
        
    
        // const workout = {title, load, reps, file};

        const formData = new FormData();

        formData.append('title',title)
        formData.append('file',file)
        formData.append('wdate',wdate)
        formData.append('wtype',wtype)
        // formData.append('location',location)
        formData.append('location_lat',location_lat)
        formData.append('location_lng',location_lng)

        // formData.forEach(element => {

        //     console.log('form data' ,element)
            
        // });


        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/upload', {
        //const response = await fetch('http://localhost:4000/api/workout/upload', {

            method: 'POST',
            body: formData,

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error);
            setLoader(false)
        }

        if(response.ok){

            setError(null);
            dispatch({type:'CREATE_WORKOUTS', payload: json});
            console.log('datajson',json)
            toast.success('Workout Added')
            navigate('/exercise');
        }

    }



    return (

           <AuthComponent>

            <Container>

             <Row id="add_heading">
                <h2>Add Location</h2>
                <p>Lets Add Your Visited Location</p>
             </Row>   
            
            <Row id="add_row">

                <Col md={6} id="map_input">
                <h2>Location</h2>
                <p>Select Location Coordinates</p>

                    <Map
                    style={{width: '100%', height: '50vh'}}
                    defaultCenter={{lat: 45.48556, lng: -73.62780}}
                    defaultZoom={10}
                    onClick={(e)=> {
                        
                        setLocation(JSON.stringify(e.detail.latLng))
                        setLocation_lat(JSON.stringify(e.detail.latLng.lat))
                        setLocation_lng(JSON.stringify(e.detail.latLng.lng))
                        
                    }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    />

                  

                </Col>
                
                <Col id="add_form" md={6}>

                <h2>Some Basic Data</h2>
                <p>Just Formality</p>

                {loader && 
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>

                }
                    
                    <Form onSubmit={handleForm} style={{padding:'0px'}}>
                        <Row>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location Name</Form.Label>
                                <Form.Control required value={title} name="title" placeholder="Place you visited" onChange={(e)=> setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col  md={12} lg={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Visited Day?</Form.Label>
                                <Form.Control required value={wdate} name="wdate" type='date' onChange={(e)=> setWdate(e.target.value)} />
                                </Form.Group>
                            </Col>
                           
                        </Row>

                        <Row>
                            <Col  md={12} lg={6}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Location Image</Form.Label>
                                <Form.Control required type="file"  name="file"  onChange={(e)=> setFile(e.target.files[0])} />
                                </Form.Group>
                            </Col>
                            <Col  md={12} lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location</Form.Label>
                                <Form.Control placeholder='Select location on' required value={location} name="location" type='text' readOnly onChange={(e)=> setLocation(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>

                             <Col  md={12} lg={6}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Vacation Type Type</Form.Label>
                                <Form.Select required name='wtype'  onChange={(e)=> setWtype(e.target.value)} aria-label="Default select example" size='md' style={{padding:'14px 10px'}}>
                                <option>Select a Type</option>
                                <option value="hiking">Hiking</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="vacation">Vacation</option>
                                </Form.Select>
                                </Form.Group>
                            </Col>
                            
                           
                    
                        </Row>
                       

                      
                        <Row>
                            <Col md={12}>

                             <Button type="submit" variant="secondary" style={{borderRadius:'0px', marginTop:'20px', background:"black", color:'white'}}>
                              Post It
                            </Button >
                            </Col>
                          
                        </Row>
                        

                    
                      
                    </Form>
                </Col>
            </Row> 
                
        
    
            
            </Container>
           </AuthComponent>
          
        
    )
}

export default Add;