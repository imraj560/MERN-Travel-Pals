import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { AuthComponent } from '../../components/AuthComponent';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Form, Button, Row, Col, Image} from "react-bootstrap";
import { format } from 'date-fns';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import './EditForm.css';

const EditForm = ()=>{

    const {dispatch} = UsePlaceContext();
    const navigate = useNavigate();
    const params = useParams();
    const [wdate, setWdate] = useState('');
    const [wtime, setWtime] = useState('');
    const [wtype, setWtype] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [location_lng, setLocation_lng] = useState('');
    const [location_lat, setLocation_lat] = useState('')
    const [description, setDescription] = useState('');
    const[file, setFile] = useState(null)
    const[oldImage, setOldImage] = useState('')
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const { user } = UseAuthContext();

    /**Format API date string */
    const formatDateString = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
      };

    useEffect(()=>{

        const apiDataFetch = async()=>{

            //const data = await fetch(`http://localhost:4000/api/place/${params.id}`, {
            const data = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/${params.id}`, {

                  headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                setTitle(data.title);
                const fdate = formatDateString(data.wdate)
                setWdate(fdate);
                setWtime(data.wtime);
                setWtype(data.wtype);
                setLocation(data.location_lng + ' : '+ data.location_lat);
                setLocation_lat(data.location_lat)
                setLocation_lng(data.location_lng)
                setOldImage(data.image);
                setFile(data.image);

            })

        }

        if(user){

             apiDataFetch();
        }

           
    
        

    },[])

    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoader(true)

        if(!user){

            return
        }
        
        // const workout = {title, load, reps};
        const formData = new FormData();

        formData.append('title',title)
        formData.append('wdate',wdate)
        formData.append('wtime',wtime)
        formData.append('wtype',wtype)
        formData.append('location_lat',location_lat)
        formData.append('location_lng',location_lng)
        formData.append('description',description)
        // formData.append('location',location)
        formData.append('file',file)
        formData.append('oldimage',oldImage)

        //const response = await fetch(`http://localhost:4000/api/place/${params.id}`, {
        const response = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/${params.id}`, {    
            method: 'PATCH',
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
        
            dispatch({type:'UPDATE_PLACE', payload: json});

            navigate('/place');
        }

    }

    return (

            <AuthComponent>

            <Container>

            <Row id="add_heading">
            <h2>Edit Location</h2>
            <p>Lets Add Your Details</p>
            </Row>   
            
            <Row id="add_row">

                <Col md={6} id="map_input">
                <h2>Location</h2>
                <p>Edit Location Coordinates</p>

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
                    >

                    <Marker position={{lat:Number(location_lat), lng:Number(location_lng)}} />
                    </Map>    
                
                                  
                
                </Col>
                
                <Col id="add_form" md={6}>
                <h2>Some Basic Data</h2>
                <p>Just Formality</p>
                {loader && 
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>

                }
                    
                    {!loader && (

                        <Form onSubmit={handleSubmit}  style={{padding:'0px'}}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location Name</Form.Label>
                                <Form.Control value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day?</Form.Label>
                                <Form.Control value={wdate} name="wdate" type='date' onChange={(e)=> setWdate(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload a new Image</Form.Label>
                                <Form.Control type="file"  name="file"  onChange={(e)=> setFile(e.target.files[0])} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                            <Image width={80} height={80} rounded className='float-start' src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+oldImage} />
                            {/* <Image src={process.env.PUBLIC_URL+"/images/"+oldImage} width={100} height={80} rounded className='float-start'/> */}
                            </Col>

                        </Row> 

                        <Row>   
                            <Col md={6}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Workout Type</Form.Label>
                                <Form.Select name='wtype' value={wtype}  onChange={(e)=> setWtype(e.target.value)} aria-label="Default select example" size='md' style={{padding:'14px 10px'}}>
                                <option>{wtype}</option>
                                <option value="hiking">Hiking</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="vacation">Vacation</option>
                                </Form.Select>
                                </Form.Group>
                            </Col>
                    
                      
                        <Col md={6}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Location</Form.Label>
                            <Form.Control value={location} name="location" type='text' onChange={(e)=> setLocation(e.target.value)} />
                            </Form.Group>
                            
                                
                        </Col>
                        </Row>

                        <Row>
                            <Col  md={12} lg={12}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required value={description} name="description" type='text' onChange={(e)=> setDescription(e.target.value)} />
                                </Form.Group>
                            </Col>
                            
                        </Row>
                            
                       

                    
                    
                       <Row>
                        <Col md={12}>

                        <Button type="submit" variant="secondary" style={{borderRadius:'0px', marginTop:'20px', background:"black", color:'white'}}>
                            Edit
                        </Button >
                        </Col>
                        
                      </Row>
                    
                    
                    </Form>

                    )}
                    
                </Col>
            </Row> 
                
        
    
            
            </Container>
              
            </AuthComponent>
           
    )
}

export default EditForm;