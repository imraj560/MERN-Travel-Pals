import { NavLink } from 'react-router-dom';
import { UseLogOut } from '../../hooks/UseLogOut';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import './Header.css';
import { BoxArrowDownRight } from 'react-bootstrap-icons';
const Header = ()=>{

    const { logout } = UseLogOut();
    const { user } = UseAuthContext();
    const navigate = useNavigate()

    const handleClick = ()=>{

        logout()

        toast.error('User Logged Out')

        navigate('/login')
    }

    return (

        <header>
            <div id="logo_title">
                <h1><NavLink style={{textDecoration:'none', color:'black'}} to="/">Workout Tracker</NavLink></h1>
            </div>
            <div id="nav_links">

                <ul>
               
                {!user && (<>
                    <li><NavLink style={{textDecoration:'none', color:'black'}} to="/login">Login</NavLink></li>
                    <li><NavLink style={{textDecoration:'none', color:'black'}} to="/signup">Register</NavLink></li>
                </>)}
                
                
                    {user && (<>
                    <li><NavLink style={{textDecoration:'none', color:'black'}} to="/exercise">Profile</NavLink></li>
                    <li onClick={handleClick}><BoxArrowDownRight/></li>
                    </>)}
                    
                </ul>

            </div>
        </header>
    )
}

export default Header;