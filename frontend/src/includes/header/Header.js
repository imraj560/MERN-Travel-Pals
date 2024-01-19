import { NavLink } from 'react-router-dom';
import './Header.css';
const Header = ()=>{

    return (

        <header>
            <div id="logo_title">
                <h1><NavLink style={{textDecoration:'none', color:'black'}} to="/">Workout Tracker</NavLink></h1>
            </div>
            <div id="nav_links">

                <ul>
                    <li>Hello Raju</li>
                    <li><NavLink style={{textDecoration:'none', color:'black'}} to="/exercise">Exercises</NavLink></li>
                    <li>Log Out</li>
                </ul>

            </div>
        </header>
    )
}

export default Header;