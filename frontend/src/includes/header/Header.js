import { NavLink } from 'react-router-dom';
import { UseLogOut } from '../../hooks/UseLogOut';
import './Header.css';
const Header = ()=>{

    const { logout } = UseLogOut();

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
                    <li>Hello Raju</li>
                    <li><NavLink style={{textDecoration:'none', color:'black'}} to="/exercise">Exercises</NavLink></li>
                    <li onClick={handleClick}>Log Out</li>
                </ul>

            </div>
        </header>
    )
}

export default Header;