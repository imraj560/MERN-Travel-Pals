
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import { format } from 'date-fns';
import { HandThumbsDown, HandThumbsUp, ChatFill} from 'react-bootstrap-icons';
import { useLike } from '../../hooks/UseLike';
import { useDislike } from '../../hooks/UseDislike';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { UseLikesContext } from '../../hooks/UseLikesContext';
import {toast} from 'react-toastify'

import { useEffect, useState } from 'react';

const HomeWorkoutCard = ({props})=>{

    const {title, reps, load, image, _id, likes, dislikes, likesCount, dislikesCount} = props;
    const {like, error} = useLike();
    const {dislike, errorr} = useDislike();
    const {user} = UseAuthContext();
    
    
    const postId = props._id

    const handleLike = async()=>{
       
      if(user){

         await like(postId)

      }else{

        toast.warning('Please Log In')

      }  
     

        
    }

    const handleDislike = async()=>{

        if(user){

             await dislike(postId)

        }else{

            toast.warning('Please Log In')
    
          }  

       
  
      }

    if(error){

        alert(error)
    }


    if(errorr){

        alert(errorr)
    }



    return (

            <Col md={3} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card key={props._id} style={{ width: '100%', borderRadius:'0px', borderColor:'white' }}>
            <Card.Img style={{height:'320px'}} variant="top" src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+props.image} />
            {/* <Card.Img style={{height:'320px', borderRadius:'0px'}} variant="top" src={"http://localhost:4000/api/workout/download/"+props.image} /> */}
            <Card.Body style={{padding:'0px'}}>
            <Card.Title style={{padding:'10px 15px',color:'black', fontWeight:'500'}}>{props.title}</Card.Title>
            <ListGroup className="list-group-flush" >
                <ListGroup.Item style={{border:"none"}}>Day: {format(props.wdate, 'MMM dd, yyyy')}</ListGroup.Item>
                <ListGroup.Item style={{border:"none"}}>Time: {props.wtime}</ListGroup.Item>
                <ListGroup.Item>Type: {props.wtype}</ListGroup.Item>
                <ListGroup.Item style={{background:'black', color:'white', padding:'17px'}}>
                    <HandThumbsUp onClick={handleLike} style={{cursor:'pointer'}} size={25} color='red'/>{props.likesCount}
                    <HandThumbsDown onClick={handleDislike} size={25} style={{cursor:'pointer', marginLeft:'20px'}} color='#a2a6a2'/>{props.dislikesCount}
                    <ChatFill style={{cursor:'pointer',  marginLeft:'20px'}} size={25} color='white'/>
                    
                    </ListGroup.Item>
                
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
           


    )
}

export default HomeWorkoutCard;