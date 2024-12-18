import {useState, useEffect} from 'react'
import { UseLogin } from '../../hooks/UseLogin';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import { Alert } from 'react-bootstrap';
import { Container, Form, Group, Button, Row, Col } from "react-bootstrap";
import { ArrowLeft, ExclamationCircleFill, Google} from 'react-bootstrap-icons';
import { jwtDecode } from "jwt-decode";
import Spinner from 'react-bootstrap/Spinner';



import './Login.css'


export const Login = ()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const{dispatch} = UseAuthContext();
    const navigate = useNavigate();
   
    

    const{error, loading, login} = UseLogin();

    const handleLogin = async(e)=>{

        e.preventDefault();
        

        await login(email, password);
        
        if(loading){

            toast.warn('Validating User')

        }

      
    }



    // const googleSuccess = (response)=>{

    //     const decodedToken = jwtDecode(response.credential)
    //     const name = decodedToken.name
    //     const email = decodedToken.email;
    //     const token = response.credential;

    //     const user = {"name":name, "email":email, "token":token}

    //     localStorage.setItem('user', JSON.stringify(user));
    //     dispatch({type: 'LOGIN', payload:user})
    //     toast.success('Successfully Logged In')
    //     navigate('/')


    // }

    // const googleError = ()=>{


    // }


    return (

        <Container>
        
        <Row id="loginRow">
            
            <Col className="shadow-sm mb-5 bg-body rounded" style={{padding:'25px 25px 0px 25px', background:'#fbf8f8', borderRadius:'5px'}} md={6}>
            <NavLink to="/"><ArrowLeft className="mb-3"></ArrowLeft></NavLink>
            {loading && 
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>

            }
                
               
                <h2 style={{fontSize:'20px',fontWeight:'500', marginBottom:'30px'}}>Welcome Back</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                    </Form.Group>
                   
                    <Button type="submit" variant="secondary" style={{borderRadius:'2px', marginTop:'20px'}}>
                        SignIn
                    </Button>

                   <Row className='mt-3'>
                    {/* <GoogleLogin 
                    size='large' width='20px' onSuccess={googleSuccess} shape='pill' theme='filled_black'
                    onError={googleError}/> */}

                    <Button variant='dark' style={{width:'40%'}}>
                         <Google/><a style={{textDecoration:"none", color:"white", marginLeft:'10px' }} href='https://mern-exercise-tracker-production.up.railway.app/auth/google'>Google</a>
                    </Button>
                   


                   </Row>
                   

                   
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