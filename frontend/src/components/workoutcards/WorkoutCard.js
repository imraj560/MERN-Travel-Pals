import './WorkoutCard.css';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import {toast} from 'react-toastify';
import Thumbnail from '../../assets/images/thumbnailone.jpg';
import { NavLink } from 'react-router-dom';

const WorkoutCard = ({props})=>{

    const {dispatch} = UseWorkoutsContext();

    /**Remember server requests are an async function */
    const deleteWorkout = async() => {

        const response = await fetch('/api/workout/'+ props._id, {

            method: 'DELETE'
        })


        const json = await response.json();

        if(response.ok){

                dispatch({type:"DELETE_WORKOUT", payload: json});

                alert('Workout successfully Deleted');

        }

    }


    return (

        <div id="workoutCard">
           <div id='thumbnail'>
            <div id='action_buttons'>
                <span style={{marginRight:'5px'}} id='delete' onClick={deleteWorkout}>X</span>
                <span id='edit' ><NavLink style={{textDecoration:'none', color:'white'}} to={'/editform/'+props._id}>E</NavLink></span>
            </div>
            <img src={Thumbnail} />
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