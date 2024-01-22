import './WorkoutCard.css';
import Thumbnail from '../../assets/images/thumbnailone.jpg';

const WorkoutCard = ({props})=>{

    const deleteWorkout = () => {

      
    }

    return (

        <div id="workoutCard">
           <div id='thumbnail'>
            <div id='action_buttons'>
                <span style={{marginRight:'5px'}} id='delete' onClick={deleteWorkout}>X</span>
                <span id='edit' onClick={deleteWorkout}>E</span>
            </div>
            <img src={Thumbnail} />
           </div>
           <div id='detail'>
            <p style={{fontSize:'28px', fontWeight:'600'}}>{props.title}</p>
            <p>{props.reps} Reps</p>
            <p>{props.load} Kg</p>
            <p>5 days ago</p>
           </div>
        </div>
    )
}

export default WorkoutCard;