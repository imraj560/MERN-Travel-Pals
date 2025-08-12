import { NavLink } from 'react-router-dom';
import { UseLogOut } from '../../hooks/UseLogOut';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import './Header.css';
import { PersonFillSlash, PersonCircle } from 'react-bootstrap-icons';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'
import { GeoAltFill } from 'react-bootstrap-icons';
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

        <Container>

            <Navbar expand="lg" className="bg-body-tertiary" style={{opacity:"1", margin:'20px 0px', backgroundColor:'white', border:'1px solid black', borderRadius:'20px', padding:'10px 20px'}}>
           
            <Navbar.Brand href="#home"><NavLink style={{textDecoration:'none', color:'black', fontWeight:'BOLD'}} to={'/'}>Travel Pals</NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                <Nav.Link><NavLink style={{textDecoration:'none', color:'black'}} to="/find"><GeoAltFill/> Find</NavLink></Nav.Link>
                {!user && (<>
                <Nav.Link><NavLink style={{textDecoration:'none', color:'black'}} to="/login">Login</NavLink></Nav.Link>
                <Nav.Link><NavLink style={{textDecoration:'none', color:'black'}} to="/signup">Register</NavLink></Nav.Link>
                </>)}

                {user && (<>
                <Nav.Link><NavLink style={{textDecoration:'none', color:'black', fontSize:'16px'}} to="/place">Profile</NavLink></Nav.Link>
                <Nav.Link><NavLink onClick={handleClick} style={{textDecoration:'none', color:'black'}}><PersonFillSlash style={{fontSize:'23PX'}}/></NavLink></Nav.Link>
                </>)}
                </Nav>
            </Navbar.Collapse>
           
            </Navbar>

         </Container>

    )
}

export default Header;