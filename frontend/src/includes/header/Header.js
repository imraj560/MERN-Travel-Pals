import { NavLink } from 'react-router-dom';
import { UseLogOut } from '../../hooks/UseLogOut';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import './Header.css';
const Header = ()=>{

    const { logout } = UseLogOut();
    const { user } = UseAuthContext();

    const handleClick = ()=>{

        logout()
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
                <li><NavLink style={{textDecoration:'none', color:'black'}} to="/exercise">Exercises</NavLink></li>
                
                    {user && (<>
                    <li style={{color:'green'}}>{user.email}</li>
                    <li onClick={handleClick}>Log Out</li>
                    </>)}
                    
                </ul>

            </div>
        </header>
    )
}

export default Header;