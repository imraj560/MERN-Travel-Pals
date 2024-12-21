import {useState} from 'react'
import { UseSignUp } from '../../hooks/UseSignUp';
import { Oval } from 'react-loader-spinner'
import './Singup.css'
import { NavLink } from 'react-router-dom';
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import { ArrowLeft, ExclamationCircleFill, Google } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';


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
                <h2 style={{fontSize:'18px',fontWeight:'500', marginBottom:'30px'}}>Lets Get You Registered</h2>
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
                   
                    <Button type="submit" variant="secondary" style={{borderRadius:'2px', marginTop:'20px'}}>
                        SignUp
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

       
    //     <div id="RegisterContainer">

    //         {loading &&  (

    //         <Oval
    //         visible={true}
    //         height="80"
    //         width="80"
    //         color="black"
    //         margin="auto"
    //         ariaLabel="oval-loading"
    //         wrapperStyle={{}}
    //         wrapperClass="loader"
    //         />
    //         )}

    //         {!loading && <div id="RegisterFormContainer">
    //             <h2>Register Here</h2>
                
    //             <form onSubmit={handleSubmit}>
    //                 <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Your Name please' /> 
    //                 <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your email please' />
    //                 <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your password please' />
    //                 <button disabled={loading} type='submit' id="signupBtn">Register</button>
    //             </form>
    //             <p style={{fontSize:'13PX'}}>Not Registered? 
    //                 <span >
    //                  <NavLink style={{color:'#8a8a8f', cursor:'pointer', textDecoration:'none', marginLeft:'5px'}} to='/login'>Login</NavLink>
    //                 </span>
    //             </p>
    //             {error && <div className='signup_error'>{error}</div>}
                
                    
              
    //         </div>}

    //    </div>
        
       
    )
}