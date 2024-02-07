import './WorkoutCard.css';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify';
import { NavLink } from 'react-router-dom';

const WorkoutCard = ({props})=>{

    const {title, reps, load, image} = props

    const {dispatch} = UseWorkoutsContext();
    const { user } = UseAuthContext()

    /**Remember server requests are an async function */
    const deleteWorkout = async() => {

        const response = await fetch('/api/workout/'+ props._id, {

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

        <div key={props._id} id="workoutCard">
           <div id='thumbnail'>
            <div id='action_buttons'>
                <span style={{marginRight:'5px'}} id='delete' onClick={deleteWorkout}>X</span>
                <span id='edit' ><NavLink style={{textDecoration:'none', color:'white'}} to={'/editform/'+props._id}>E</NavLink></span>
            </div>
            <img src={process.env.PUBLIC_URL+"images/"+props.image} />
           </div>
           <div id='detail'>
            <p style={{fontSize:'28px', fontWeight:'600'}}>{props.title}</p>
            <p>{props.reps} Reps</p>
            <p>{props.load} Kg</p>
            <p>{props.createdAt}</p>
           </div>
        </div>
    )
}

export default WorkoutCard;