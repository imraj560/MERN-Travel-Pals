import {useState} from 'react'
import { UseSignUp } from '../../hooks/UseSignUp';
import { Oval } from 'react-loader-spinner'
import './Singup.css'
import { NavLink } from 'react-router-dom';
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import { ArrowLeft, ExclamationCircleFill, Google } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';
import { FcGoogle } from "react-icons/fc";


export const Signup = ()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const [cPassword, setCpassword] = useState('');

    const{error, loading, signup} = UseSignUp();

    const handleSubmit = async(e)=>{

        e.preventDefault();

        await signup(name, email, password, cPassword);
 
        
    }

    return (

        <Container>

        <Row id="registerRow">
            
            <Col className="shadow-sm mb-5 bg-body rounded" style={{padding:'25px 25px 0px 25px', borderRadius:'5px'}} md={6}>
               <NavLink to="/"><ArrowLeft className="mb-3"></ArrowLeft></NavLink>
               {loading && 
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>

            }
                <h2 style={{fontSize:'30px',fontWeight:'bold', marginBottom:'30px'}}>Sign Up</h2>
                <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter name" />
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name={cPassword} value={cPassword} onChange={(e)=>setCpassword(e.target.value)} type="password" placeholder="confirm it" />
                        <Form.Text className="text-muted">
                        Just making sure your password matches
                        </Form.Text>
                    </Form.Group>
                   
                    <Button id="signIn_button" type="submit" variant="default" style={{borderRadius:'0px', border:'1px solid black', marginTop:'20px'}}>
                        SignUp
                    </Button>

                    <Button id="google_link" variant='dark' style={{marginTop:'10px', borderRadius:'0px'}}>
                          <FcGoogle/><a style={{textDecoration:"none", color:"white", marginLeft:'10px' }} href='https://mern-exercise-tracker-production.up.railway.app/auth/google'>Google</a>
                         {/* <Google/><a style={{textDecoration:"none", color:"white", marginLeft:'10px' }} href='http://localhost:4000/auth/google'>Google</a> */}
                        </Button>

                    
                    {error  &&
                    
                    <Alert variant='dark' style={{marginTop:'20px'}}>
                       <ExclamationCircleFill/> {error}
                   </Alert>

                   }
                   
                </Form>
            </Col>
        </Row> 
            
       
   
        
    </Container>

       
       
    )
}