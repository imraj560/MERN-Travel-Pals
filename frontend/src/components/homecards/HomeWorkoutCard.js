import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import { format, set } from 'date-fns';
import { HandThumbsDown, HandThumbsUp, ChatFill, ChatDotsFill, CheckLg, Trash} from 'react-bootstrap-icons';
import { useLike } from '../../hooks/UseLike';
import { useDislike } from '../../hooks/UseDislike';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { UseLikesContext } from '../../hooks/UseLikesContext';
import {toast} from 'react-toastify'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { UseCommentsContext } from '../../hooks/UseCommentsContext';






const HomeWorkoutCard = ({props})=>{

    const {title, reps, load, image, _id, likes, dislikes, likesCount, dislikesCount} = props;
    const params = useParams();
    const {like, error} = useLike();
    const {dislike, errorr} = useDislike();
    const {user} = UseAuthContext();
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([]);
    const [cerror, setCerror] = useState(null);
    const [responsee, setResponsee] = useState();
    const {comments, dispatch} = UseCommentsContext()
    const postId = props._id

    /**load comment */
    const handleClose = () => {

      setShow(false);
      dispatch({type: 'CLEAR_COMMENTS'})

    } 

    const handleShow = () => {

      setShow(true);

      const apiFetch = async()=>{

         const data = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/workout/commentlist/${postId}`,{
         //const data = await fetch(`http://localhost:4000/api/workout/commentlist/${postId}`,{

           method: 'GET',
           headers: {'Content-Type': 'application/json'},

          }).then((response)=>{

              return response.json()

          }).then((data)=>{
              
              dispatch({type: 'SET_COMMENTS', payload: data.comments})

             
             
            console.log('CommentList is:', comments)
              

          }).catch((error)=>{

              console.log("The error is:", error)
          })

      }

      apiFetch()


    } 

    /**like response */
    const handleLike = async()=>{
       
      if(user){

         await like(postId)

      }else{

        toast.warning('Please Log In')

      }  
     

        
    }
    /**Dislike response */
    const handleDislike = async()=>{

        if(user){

             await dislike(postId)

        }else{

            toast.warning('Please Log In')
    
          }  

       
  
      }

   /**Create Comment */   
   const handleForm = async(e)=>{
    
      e.preventDefault()

      if(user){

      //const response = await fetch('http://localhost:4000/api/workout/comment', {
      const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/comment',{   

              method: 'POST',
              body: JSON.stringify({ comment, postId }),

              headers:{

                  'Content-Type' : 'application/json',
                  'Authorization' : `Bearer ${user.token}`
              }

            })

            const json = await response.json();


            if(response){

              setResponsee(json.message)
              dispatch({type: 'CREATE_COMMENTS', payload: json.postComment})
              setTimeout(() => {
                setResponsee('');
              }, 2000);  // 2000 milliseconds = 2 seconds
              setComment('')
              setCerror(null)


            }

      }else{

        toast.warning('Please Log In')
        setComment('')
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


          <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton style={{padding:'10px 15px', background:'#e1e1e1', color:'black'}}>
                    <Modal.Title style={{fontSize:'15px'}}>Share Opinion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{padding:'10px 10px'}}>

                    {responsee && 

                    <div style={{height:'10px' ,padding:'15px 10px', color:'green'}}>
                   
                    <p>{responsee}</p>
                   
                   </div>
                    
                    }
                   
                    <Form style={{padding:'5px 15px', height:'55px'}} onSubmit={handleForm}>
                    <Row>
                      <Col md={10} style={{padding:'0 2px 0 0'}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control required style={{padding:'0px 15px', height:'42px'}} name='comment' value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Your thoughts" />
                      </Form.Group>
                      </Col>
                      <Col md={2} style={{padding:'0'}}>
                        <Button type='submit' style={{width:'100%', height:'41px'}} variant="primary">
                        Post
                        </Button>
                      </Col>
                    </Row>
                   
                   
                  </Form>
                  <ListGroup>
                  {comments && comments
                   .map((singleComment)=>{

                    return (

                      <ListGroup.Item key={singleComment._id}>
                        {singleComment.comment}
                      </ListGroup.Item>
                    )

                  })} 
                  
                 
                </ListGroup>

                  </Modal.Body>
                 
                </Modal>


            <Card key={props._id} style={{ width: '100%', borderRadius:'0px', borderColor:'white' }}>
            <Card.Img style={{height:'320px'}} variant="top" src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+props.image} />
            {/* <Card.Img style={{height:'320px', borderRadius:'0px'}} variant="top" src={"http://localhost:4000/api/workout/download/"+props.image} /> */}
            <Card.Body style={{padding:'0px'}}>
            <Card.Title style={{padding:'10px 15px',color:'black', fontWeight:'500'}}>{props.title}</Card.Title>
            <ListGroup className="list-group-flush" >
                <ListGroup.Item style={{border:"none"}}>Day: {format(props.wdate, 'MMM dd, yyyy')}</ListGroup.Item>
                <ListGroup.Item style={{border:"none"}}>Time: {props.wtime}</ListGroup.Item>
                <ListGroup.Item>Type: {props.wtype}</ListGroup.Item>
                <ListGroup.Item style={{background:'#f3f3f3', color:'black', padding:'12px'}}>
                    <HandThumbsUp onClick={handleLike} style={{cursor:'pointer'}} size={20} color='red'/>{props.likesCount}
                    <HandThumbsDown onClick={handleDislike} size={20} style={{cursor:'pointer', marginLeft:'20px'}} color='#a2a6a2'/>{props.dislikesCount}
                    <ChatDotsFill onClick={handleShow} style={{cursor:'pointer',  marginLeft:'20px'}} size={20} color='gray'/>
                    
                    </ListGroup.Item>
                
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
           


    )
}

export default HomeWorkoutCard;