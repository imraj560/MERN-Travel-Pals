import './WorkoutCard.css';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify';
import { ArrowRight, Pencil, PencilFill, PencilSquare, Trash2, Trash3, XSquare } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

const WorkoutCard = ({props})=>{

    const {title, reps, load, image} = props

    const {dispatch} = UseWorkoutsContext();
    const { user } = UseAuthContext()

    /**Remember server requests are an async function */
    const deleteWorkout = async() => {
    
        // const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/'+ props._id, {
        const response = await fetch('http://localhost:4000/api/workout/'+ props._id, {


            method: 'DELETE',

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })


        const json = await response.json();

        if(response.ok){

                dispatch({type:"DELETE_WORKOUT", payload: json});

               toast.error('Workout Deleted');

        }

    }


    return (

        <Col md={3} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
         <div key={props._id} id="workoutCard" style={{borderRadius:'5px'}}>
           <div id='thumbnail'>
            <div id='action_buttons'>
                <span style={{marginRight:'10px'}} id='delete' onClick={deleteWorkout}><XSquare size={24}/></span>
                <span id='edit' ><NavLink style={{textDecoration:'none', color:'white'}} to={'/editform/'+props._id}><Pencil/></NavLink></span>
            </div>
            <img src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+props.image} />
           </div>
           <div id='detail'>
            <p style={{fontSize:'20px', fontWeight:'550'}}>{props.title}</p>
            <p>{props.reps} Reps</p>
            <p>{props.load} Kg</p>
            <p>{props.createdAt}</p>
           </div>
        </div>
        </Col>
       

        
    )
}

export default WorkoutCard;