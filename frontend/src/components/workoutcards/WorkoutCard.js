import './WorkoutCard.css';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify';
import { Pencil, XSquare } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap'
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Trash2Fill, ExclamationCircle } from 'react-bootstrap-icons';
import { HandThumbsDown, HandThumbsUp, Chat} from 'react-bootstrap-icons';

import { useState } from 'react';



const WorkoutCard = ({props})=>{

  const {title, reps, load, image, _id, likes, dislikes, likesCount, dislikesCount} = props;

    const {dispatch} = UseWorkoutsContext();
    const { user } = UseAuthContext()
    const [show, setShow] = useState(false)

    /**Modal functions */
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    /**Remember server requests are an async function */
    const deleteWorkout = async() => {
    
        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/'+ props._id, {
        //const response = await fetch('http://localhost:4000/api/workout/'+ props._id, {


            method: 'DELETE',

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })


        const json = await response.json();

        if(response.ok){

                dispatch({type:"DELETE_WORKOUT", payload: json});

                setShow(false)

                toast.error('Workout Deleted');

        }

    }


    return (

        <Col md={4} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><ExclamationCircle/> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteWorkout}>
            <Trash2Fill/> Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
         <div key={props._id} id="workoutCard" style={{borderRadius:'5px'}}>
           <div id='thumbnail'>
            <div id='action_buttons'>
                <span style={{marginRight:'10px'}} id='delete' onClick={handleShow}><XSquare size={24}/></span>
                <span id='edit' ><NavLink style={{textDecoration:'none', color:'white'}} to={'/editform/'+props._id}><Pencil/></NavLink></span>
            </div>
            <img src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+props.image} />
            {/* <img src={"http://localhost:4000/api/workout/download/"+props.image} /> */}
           </div>
           <div id='detail'>
            <p style={{fontSize:'20px', fontWeight:'550'}}>{props.title}</p>
            <p>Day : {format(props.wdate, 'MMM dd, yyyy')}</p>
            <p>Time : {props.wtime}</p>
            <p>Type : {props.wtype}</p>
            <p>
            <HandThumbsDown size={17} style={{marginRight:'5px'}} color='#a2a6a2'/>{props.dislikesCount}
            <HandThumbsUp style={{ marginLeft:'18px'}} size={17} color='green'/>{props.likesCount}
            <Chat style={{marginLeft:'18px'}} size={17} color='gray'/> 3
            </p>
          
           </div>
        </div>
        </Col>
       

        
    )
}

export default WorkoutCard;