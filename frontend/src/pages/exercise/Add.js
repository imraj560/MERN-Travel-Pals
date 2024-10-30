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
import './Add.css';

const Add = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const { user } = UseAuthContext()

    const [title, setTitle] = useState('');
    const[file, setFile] = useState('')
    const [wdate, setWdate] = useState('');
    const [wtime, setWtime] = useState('');
    const [wtype, setWtype] = useState('');
    const [location, setLocation] = useState('');
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
        formData.append('wtime',wtime)
        formData.append('wtype',wtype)
        formData.append('location',location)

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

           
            // setTitle('');
            // setLoad('');
            // setReps('');
            // setFile('')
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
            
            <Row id="loginRow">
                
                <Col className="shadow-sm mb-5 bg-body rounded" style={{padding:'25px 25px 0px 25px', background:'#fbf8f8', borderRadius:'5px'}} md={8}>
                {loader && 
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>

                }
                    
                
                    <h2 style={{fontSize:'20px',fontWeight:'500', marginBottom:'30px'}}>Alright! Lets schedule a workout</h2>
                    <Form onSubmit={handleForm}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control required value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day?</Form.Label>
                                <Form.Control required value={wdate} name="wdate" type='date' onChange={(e)=> setWdate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Time?</Form.Label>
                                <Form.Control required value={wtime} name="wdate" type='time' onChange={(e)=> setWtime(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Workout Image</Form.Label>
                                <Form.Control required type="file"  name="file"  onChange={(e)=> setFile(e.target.files[0])} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Workout Type</Form.Label>
                                <Form.Select required name='wtype'  onChange={(e)=> setWtype(e.target.value)} aria-label="Default select example" size='md' style={{padding:'14px 10px'}}>
                                <option>Select a Type</option>
                                <option value="cardio">Cardio</option>
                                <option value="calesthenics">Calesthenics</option>
                                <option value="weight">Weight Trainning</option>
                                </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location / Gym</Form.Label>
                                <Form.Control placeholder='place of workout' required value={location} name="location" type='location' onChange={(e)=> setLocation(e.target.value)} />
                                </Form.Group>
                            </Col>
                    
                        </Row>
                       

                      
                    
                        <Button type="submit" variant="secondary" style={{borderRadius:'2px', marginTop:'20px'}}>
                            Post It
                        </Button>

                    
                      
                    </Form>
                </Col>
            </Row> 
                
        
    
            
            </Container>
           </AuthComponent>
          
        
    )
}

export default Add;