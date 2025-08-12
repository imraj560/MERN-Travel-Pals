import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import { format, set } from 'date-fns';
import { ChatDotsFill, CheckLg, Trash3Fill, PersonDash, ChatQuote, ChatSquareText, ReplyFill} from 'react-bootstrap-icons';
import { useLike } from '../../hooks/UseLike';
import { useDislike } from '../../hooks/UseDislike';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { UseCommentsContext } from '../../hooks/UseCommentsContext';
import Spinner from 'react-bootstrap/Spinner';
import Reply from '../reply/Reply';
import { FcLike, FcDislike } from "react-icons/fc";
import { WiDaySunny } from "react-icons/wi";
import { IoTimerSharp } from "react-icons/io5";
import { FiType } from "react-icons/fi";
import { FaCalendarCheck } from "react-icons/fa";
import './HomePlaceCard.css'


const HomePlaceCard = ({props})=>{

    const {title, reps, load, image, _id, likes, dislikes, description, likesCount, dislikesCount} = props;
    const params = useParams();
    const {like, error, loading} = useLike();
    const {dislike, errorr, lloading} = useDislike();
    const {user} = UseAuthContext();
    const {comments, dispatch} = UseCommentsContext()
    const [show, setShow] = useState(false);
     const [showw, setShoww] = useState(false);
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([]);
    const [cerror, setCerror] = useState(null);
    const [responsee, setResponsee] = useState(false);
    const [auth, setAuth] = useState(false);
    const [delload, setDelload] = useState(false)
    const [visibleComponentId, setVisibleComponentId] = useState(null);
    const [showId, setShowid] = useState(null);
   
    const postId = props._id

    /**load comment */
    const handleClose = () => {

      setShow(false);
      dispatch({type: 'CLEAR_COMMENTS'})

    } 

      const handleClosee = () => {

      setShoww(false);
      

    } 

    const handleShoww = () => {

      setShoww(true);

    }


    const handleShow = () => {

      setShow(true);

      const apiFetch = async()=>{

         const data = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/commentlist/${postId}`,{
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
    const handleLike = async(e)=>{
       
      e.preventDefault()

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

   /**Post Comment */   
   const handleForm = async(e)=>{

      e.preventDefault()

      setResponsee(true)

      if(user){

      //const response = await fetch('http://localhost:4000/api/place/comment', {
      const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/comment',{   

              method: 'POST',
              body: JSON.stringify({ comment, postId }),

              headers:{

                  'Content-Type' : 'application/json',
                  'Authorization' : `Bearer ${user.token}`
              }

            })

            const json = await response.json();


            if(response){

              setResponsee(false)
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
        setResponsee(false)
      }

     
      
     
   }
   
   /**Deleting Comments */
   const deleteComment = async(id)=>{

    setVisibleComponentId(id)
    setDelload(true)
    
    if(user){

        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/deleteComment/'+id, {
        //const response = await fetch('http://localhost:4000/api/place/deleteComment/'+id, {


                method: 'DELETE',
                headers:{
                    
                    'Authorization' : `Bearer ${user.token}`
                }
            })


            const json = await response.json();

            if(response.ok){
                    setDelload(false)
                    dispatch({type: 'DELETE_COMMENTS', payload: json.comments})
                    toast.error(json.message);
                  
            }

            if(!response.ok){
            
              setDelload(false)
              setAuth(true)
              setTimeout(() => {
              setAuth(false)
              }, 2000);  


            }

    }else{

      toast.warning('Please Log In')
      setVisibleComponentId('')
      setDelload(false)

    }

  
    

   }

   /**Toggle component views */

   const toggleComponent = (id) => {

    setShowid((prevId) => (prevId === id ? null : id));


  };

    if(error){

        alert(error)
    }


    if(errorr){

        alert(errorr)
    }



    return (

            <Col md={6} sm={12} lg={4} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>


               {/**Start of About Model */}
          <Modal show={showw} onHide={handleClosee} style={{borderRadius:"0PX"}}>
                  <Modal.Header closeButton style={{padding:'10px 15px', background:'white', color:'black', border:"none", padding:'10px 15px'}}>
                    <Modal.Title style={{fontSize:'35px', fontFamily:'Poppins', fontWeight:'600'}}>About Place</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{padding:'10px 10px', minHeight:'200px', textAlign:'justify', padding:'0px 15px 10px 15px'}}>

                  {description}
             

                  </Modal.Body>
                 
                </Modal>
                {/**End of Modal */}    

          {/**Start of Comment Model */}
          <Modal show={show} onHide={handleClose} style={{borderRadius:"0PX"}}>
                  <Modal.Header closeButton style={{padding:'10px 15px', background:'white', color:'black', border:"none"}}>
                    <Modal.Title style={{fontSize:'35px', fontFamily:'Poppins', fontWeight:'600'}}>Say something</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{padding:'10px 10px', minHeight:'200px'}}>

               
                   
                    <Form style={{padding:'5px 15px', height:'55px'}} onSubmit={handleForm}>
                    <Row>
                      <Col md={10} sm={10} xs={10} style={{padding:'0 2px 0 0'}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control required style={{padding:'0px 15px', height:'42px', borderRadius:"0px"}} name='comment' value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Your thoughts" />
                      </Form.Group>
                      </Col>
                      <Col md={2} sm={2} xs={2} style={{padding:'0'}}>
                        <Button type='submit' style={{width:'100%', height:'41px', borderRadius:'0px', background:"black", color:"white"}} variant="secondary">
                        {!responsee && ('Post')}{responsee && (<Spinner size="sm" variant='warning' animation="border" style={{marginTop:'4px'}} />)}
                        </Button>
                      </Col>
                    </Row>
                   
                   
                  </Form>
                
                  <ListGroup style={{marginTop:'20px'}}>
                  {comments && comments
                   .map((singleComment)=>{

                    return (

                      <ListGroup.Item key={singleComment._id} id="commentDiv">
                        <span style={{fontWeight:'550'}}>{singleComment.name}</span> - <span>{singleComment.comment}</span>
                        <span id="deleteAuth" className='float-end' style={{color:'red', fontWeight:'550'}}></span>
                        <Trash3Fill onClick={()=>deleteComment(singleComment._id)} style={{cursor:'pointer', marginTop:'4px'}} className='float-end' id="deleteIcon"/>
                          <ChatSquareText onClick={()=> toggleComponent(singleComment._id)} className='float-end' style={{marginTop:'5px', marginRight:'10px', cursor:'pointer'}}/>
                        {(delload && visibleComponentId === singleComment._id) && (<Spinner className='float-end' style={{marginLeft:'20px', marginTop:'4px'}} animation="border" role="status" variant='danger' size='sm'></Spinner>)}
                        {(auth && visibleComponentId === singleComment._id) && <PersonDash style={{marginTop:'4px', marginRight:'7px'}} className='float-end' color='red'/> }
                       
                        {/**Reply Component */}
                        {showId === singleComment._id && (

                          <Reply commentId={singleComment._id} />

                        )}

                        {/**Reply ends here */}
                       
                      </ListGroup.Item>
                    )

                  })} 
                  
                 
                </ListGroup>

                  </Modal.Body>
                 
                </Modal>
                {/**End of Modal */}    
                  
            <Card id="homeCard" key={props._id} style={{ width: '100%', borderRadius:'7px', borderColor:'#c1bfbf' }}>
         <Card.Img style={{height:'330px', borderRadius:'7px 7PX 0PX 0PX'}} variant="top" src={"https://mern-exercise-tracker-production.up.railway.app/api/place/download/"+props.image} />
            {/* <Card.Img style={{height:'320px', borderRadius:'7px'}} variant="top" src={"http://localhost:4000/api/place/download/"+props.image} /> */}
            <Card.Body style={{padding:'0px', borderColor:'black', borderRadius:'7PX', height:'185px'}}>
            <Row>
              <Col md={8} sm={8} xs={8}> <Card.Title id="home_card_title">{props.title}</Card.Title></Col>
              <Col md={4} sm={4} xs={4}> <Card.Title id="home_card_date" className='float-end'>{format(props.wdate, 'yyyy-dd-MM')}</Card.Title></Col>      
            </Row>
                  
            <Card.Text style={{fontSize:"12PX", padding:'0PX 12PX'}}>
              {description.slice(0,135)} <span onClick={handleShoww} style={{cursor:"pointer", color:'gray', textDecoration:"none"}}>Read More...</span>
            </Card.Text>      
            
            <ListGroup className="list-group-flush" style={{borderRadius:'7px'}} >
                <ListGroup.Item style={{background:'white', color:'black', padding:'12px'}}>
                    <FcLike id="likeIcon" onClick={handleLike} style={{cursor:'pointer', background:'white'}} size={22} color='#159996'/>{props.likesCount}
                    <FcDislike id="dislikeIcon" onClick={handleDislike} size={22} style={{cursor:'pointer', marginLeft:'40px'}} color='#a2a6a2'/>{props.dislikesCount}
                    <ChatDotsFill onClick={handleShow} style={{cursor:'pointer',  marginLeft:'40px'}} size={22} color='green'/>
                    {(loading || lloading) && (

                       <Spinner style={{marginLeft:'20px'}} animation="border" role="status" variant='warning' size='sm'></Spinner>
                    )}
                     

                    </ListGroup.Item>
                
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
           


    )
}

export default HomePlaceCard;