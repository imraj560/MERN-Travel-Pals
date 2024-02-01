import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { UseLogin } from '../../hooks/UseLogin';
import './Login.css'


export const Login = ()=>{

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const{error, loading, login} = UseLogin();

    const handleSubmit = async(e)=>{

        e.preventDefault();

        await login(email, password);
 
        navigate('/')
    }

    return (

       
        <div id="container">

            <div id="signupContainer">
                <h2>Login Here</h2>
                
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your email please' />
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Your password please' />
                    <button disabled={loading} type='submit' id="signupBtn">Login</button>
                </form>
                {error && <div className='signup_error'>{error}</div>}
                
                    
              
            </div>

       </div>
        
       
    )
}