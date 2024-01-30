import {useState} from 'react'
import { UseSignUp } from '../../hooks/UseSignUp';
import './Singup.css'


export const Signup = ()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const{error, loading, signup} = UseSignUp();

    const handleSubmit = async(e)=>{

        e.preventDefault();

        await signup(email, password);
 
        
    }

    return (

       
        <div id="container">

            <div id="signupContainer">
                <h2>Register Here</h2>
                
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your email please' />
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your password please' />
                    <button disabled={loading} type='submit' id="signupBtn">Register</button>
                </form>
                {error && <div className='signup_error'>{error}</div>}
                
                    
              
            </div>

       </div>
        
       
    )
}