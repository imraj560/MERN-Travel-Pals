import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { AuthComponent } from '../../components/AuthComponent';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Form, Button, Row, Col, Image} from "react-bootstrap";
import { format } from 'date-fns';
import './EditForm.css';

const EditForm = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const params = useParams();
    const [wdate, setWdate] = useState('');
    const [wtime, setWtime] = useState('');
    const [wtype, setWtype] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
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

            //const data = await fetch(`http://localhost:4000/api/workout/${params.id}`, {
            const data = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/workout/${params.id}`, {

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
                setLocation(data.location);
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
        formData.append('location',location)
        formData.append('file',file)
        formData.append('oldimage',oldImage)

        //const response = await fetch(`http://localhost:4000/api/workout/${params.id}`, {
        const response = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/workout/${params.id}`, {    
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
        
            dispatch({type:'UPDATE_WORKOUT', payload: json});

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
                    
                
                    <h2 style={{fontSize:'20px',fontWeight:'500', marginBottom:'30px'}}>Alright! Lets edit your schedule</h2>
                    {!loader && (

                        <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day?</Form.Label>
                                <Form.Control value={wdate} name="wdate" type='date' onChange={(e)=> setWdate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Time?</Form.Label>
                                <Form.Control value={wtime} name="wdate" type='time' onChange={(e)=> setWtime(e.target.value)} />
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
                            <Col md={2}>
                            <Image width={80} height={80} rounded className='float-start' src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+oldImage} />
                            {/* <Image src={process.env.PUBLIC_URL+"/images/"+oldImage} width={80} height={80} rounded className='float-start'/> */}
                            </Col>
                            <Col md={4}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Workout Type</Form.Label>
                                <Form.Select name='wtype' value={wtype}  onChange={(e)=> setWtype(e.target.value)} aria-label="Default select example" size='md' style={{padding:'14px 10px'}}>
                                <option>Select a Type</option>
                                <option value="cardio">Cardio</option>
                                <option value="calesthenics">Calesthenics</option>
                                <option value="weight">Weight Trainning</option>
                                </Form.Select>
                                </Form.Group>
                            </Col>
                    
                        </Row>
                        <Col md={4}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Location</Form.Label>
                            <Form.Control value={location} name="location" type='text' onChange={(e)=> setLocation(e.target.value)} />
                            </Form.Group>
                            
                                
                        </Col>
                        <Row>
                            
                        </Row>
                    

                    
                    
                        <Button type="submit" variant="secondary" style={{borderRadius:'2px', marginTop:'20px'}}>
                            Edit Post
                        </Button>

                    
                    
                    </Form>

                    )}
                    
                </Col>
            </Row> 
                
        
    
            
            </Container>
              
            </AuthComponent>
           
    )
}

export default EditForm;