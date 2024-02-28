import './HomeWorkoutCard.css';

const HomeWorkoutCard = ({props})=>{

    const {title, reps, load, image} = props

  

    return (

        <div key={props._id} id="workoutCard">
           <div id='thumbnail'>
           <img src={process.env.PUBLIC_URL+"images/1707306553483deadlift.jpg"} />
           </div>
           <div id='detail'>
            <p style={{fontSize:'28px', fontWeight:'600'}}>{props.title}</p>
            <p style={{fontSize:'17px'}}>{props.reps} Reps</p>
            <p style={{fontSize:'17px'}}>{props.load} Kg</p>
            <p style={{fontSize:'17px'}}>{props.createdAt}</p>
           </div>
        </div>
    )
}

export default HomeWorkoutCard;