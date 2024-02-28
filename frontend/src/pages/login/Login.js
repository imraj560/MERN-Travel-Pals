import {useState} from 'react'
import { UseLogin } from '../../hooks/UseLogin';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'

import './Login.css'


export const Login = ()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
   
    

    const{error, loading, login} = UseLogin();

    const handleSubmit = async(e)=>{

        e.preventDefault();
        

        await login(email, password);
        
        if(loading){

            toast.warn('Validating User')

        }

      
    }

    return (

       
        <div id="container">

                {loading &&  (

                <Oval
                visible={true}
                height="80"
                width="80"
                color="black"
                margin="auto"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
                />
                )}

            {!loading && <div id="signupContainer">
                <h2>Login Here</h2>
                
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your email please' />
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your password please' />
                    <button disabled={loading} type='submit' id="signupBtn">Login</button>
                </form>
                <p style={{fontSize:'13PX', marginTop:'4px'}}>Not Registered? 
                    <span >
                     <NavLink style={{color:'#8a8a8f', cursor:'pointer', textDecoration:'none', marginLeft:'5px'}} to='/signup'>SignUp</NavLink>
                    </span>
                </p>
                {error && <div className='signup_error'>{error}</div>}
                
                    
              
            </div>}    

            

       </div>
        
       
    )
}