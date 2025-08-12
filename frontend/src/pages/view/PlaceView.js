import './PlaceView.css';
import { useState, useEffect, useRef } from 'react';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { UseCommentsContext } from '../../hooks/UseCommentsContext';
import { UsePlaceContext } from '../../hooks/UsePlaceContext';
import { Container, Row, Button, Col, Image, Form, Card} from 'react-bootstrap';
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import { FcLike, FcDislike, FcCalendar, FcComments } from "react-icons/fc";
import { ChatDotsFill, Trash3Fill, PersonDash, ChatQuote, ChatSquareText} from 'react-bootstrap-icons';
import { format, set } from 'date-fns';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoIosContact } from "react-icons/io";
import { RiGalleryFill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import Reply from '../../components/reply/Reply';

const PlaceView = ()=>{

    const {place} = UsePlaceContext();
    const { id } = useParams();
    const [filteredData, setFilteredData] = useState([])
    const [gallery, setGallery] = useState([])
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [owner, setOwner] = useState('');
    const [load, setLoad] = useState(false);
    const messageRef = useRef(null);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const [responsee, setResponsee] = useState(false);
    const {comments, dispatch} = UseCommentsContext();
    const [comment, setComment] = useState('')
    const [cerror, setCerror] = useState(null);
    const {user} = UseAuthContext();
    const [visibleComponentId, setVisibleComponentId] = useState(null);
    const [delload, setDelload] = useState(false)
    const [auth, setAuth] = useState(false);
    const [showId, setShowid] = useState(null);

    const postId = id

    useEffect(()=>{
    
        //fitler context according to id

        if(place !== null){

            const filteredPlace = place.filter((singlePlace)=>{

                return singlePlace._id === `${id}`;
            })

          setOwner(filteredPlace[0].user_id )

          setFilteredData(filteredPlace)

        }
    
    
        }, [])

    /**Fetch Gallery Image */
    useEffect(()=>{

        const fetchApiData = async ()=>{

           

            //const data = fetch(`http://localhost:4000/api/place/gallery/${id}`, {
            const data = fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/gallery/${id}`, {

                method: 'GET',
                headers:{

                    'Content-Type' : 'application/json',
                   
                    
                }
            }).then((response)=>{

                return response.json()


            }).then((data)=>{

                setGallery(data)

                
              
            })
        }

        fetchApiData()

    },[])

    /**Send mail */
    const handleSubmit = async(e)=>{

        setLoad(true)

        e.preventDefault()

         const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/contact', {
         //const response = await fetch('http://localhost:4000/api/place/contact', {
        
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({subject, message, email, owner})
                })
        
                const json = await response.json();
        
                if(!response.ok){
                    
                    toast.warning(json.message)
                    setLoad(false)
                }
        
                if(response.ok){
                  
                    setLoad(false)
                    toast.success(json.message)
                    messageRef.current.value = "";
                    subjectRef.current.value = "";
                    emailRef.current.value = "";
                  
                }

        
    }

    /**Load Comments */

    useEffect(()=>{


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

    }, [])

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

    const mapStyles = [
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#000000" }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{ "color": "#f2f2f2" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#ffffff" }]
        }
      ]

    return (

        <AuthComponent>

            <Container>
                <Row id='placeViewMap'>
                    <h2>Location Details</h2>
                    <p>Below are some Details</p>
                    <Map
                        style={{width: '100%', height: '50vh'}}
                        defaultCenter={{lat: 34.04126115291605, lng: -39.35729627839302}}
                        options={{ styles: mapStyles }}
                        defaultZoom={2}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        > 
                        {
                            filteredData.map((singleMarker)=>{

                                return (

                                    <Marker
                                    position={{lat:Number(singleMarker.location_lat), lng:Number(singleMarker.location_lng)}} 
                                    clickable={true}
                                    id="map"
                                    />

                                )
                            })
                        }

                               

                    </Map>
                </Row>

                <Row id="about">

                    <h2>About Place</h2>
                    <p>Something About the Place</p>
                    {filteredData.map((singleData)=>{

                            return (
                                <div id="about_description">
                            
                                    <p id="place_title" style={{fontWeight:'600'}}>{singleData.title}</p>
                                    {/* <p id="description"><FcLike style={{fontSize:'26PX'}}/> {singleData.likesCount} <FcDislike style={{marginLeft:'20PX',fontSize:"26PX"}}/> {singleData.dislikesCount}</p> */}
                                    <p id="about_description_para">{singleData.description}</p>
                                    
                                    
                                    
                                    
                                </div>  
                                
                            )
                            })}
                    
                    
                </Row>

              


                 <Row id="gallery_view">
                  
                
                  
                    
                    { 

                            gallery && gallery.length > 0 ? ( gallery.slice(0,3).map((single_image)=>{

                                return (
                                    
                                    <Col id="image_col" style={{padding:'2px', height:"400px"}} md={4} lg={4} sm={4}>
                                    {/* <Image id="view_image"  height='100%' width="100%" src={"http://localhost:4000/api/place/download/"+single_image.image} /> */}
                                    <Image id="view_image" square height='100%' width="100%" src={"https://mern-exercise-tracker-production.up.railway.app/api/place/download/"+single_image.image} />
                                    </Col>
                                )
                            })) : (<p style={{fontSize:'20PX', borderRadius:'5px', padding:'10px'}}>! Traveller has not added any image to Gallery</p>)
                            
                            
                    }
                 

                 

                </Row>

                 <Row id="stats" style={{marginTop:'15PX'}}>
                
                            <Col className='col_stats' md={6} sm={12} lg={4}>
                            <FcLike style={{fontSize:'30px', marginBottom:'15px', marginTop:'20px'}}/>
                            <h4 class="service_heading">Likes</h4>
                            {
                                filteredData.map((data)=>{

                                    return (

                                        <>
                                         <p>{data.likesCount}</p>
                                        </>
                                    )
                                })
                            }
                           
                            </Col>
                
                            <Col className='col_stats' md={6} sm={12} lg={4}>
                            <FcDislike style={{fontSize:'30px', marginBottom:'15px', marginTop:'20px'}}/>
                            <h4 class="service_heading">Dislikes</h4>
                           {
                                filteredData.map((data)=>{

                                    return (

                                        <>
                                         <p>{data.dislikesCount}</p>
                                        </>
                                    )
                                })
                            }
                            </Col>
                
                            <Col className='col_stats' md={6} sm={12} lg={4}>
                            <FcComments style={{fontSize:'30px', marginBottom:'15px', marginTop:'20px'}}/>
                            <h4 class="service_heading">Comments</h4>
                            <p>3</p>
                            </Col>
                
                
                            </Row>


                 <Row id="feedback">

                    <h2 id="feedback_title">Some Feedback</h2>
                    <p style={{textAlign:"center"}}>Share somethings with the Community or reach our to the traveller</p>
                  
                  <Col md={6} id="comments">

                   <h2 id='underline-headingg'>Say Something</h2>   

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
                   
                  </Col>

                  <Col md={6} id='travel'>

                        <h2 id='underline-heading'>Contact Traveller</h2>    
                    
                        <Form id="travel_form" onSubmit={handleSubmit}>
                    
                        <Row className='m-0'>
                            <Col md={6} className='p-0 p-md-1'>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{marginLeft:'0px'}}>Email</Form.Label>
                                <Form.Control required type="email" ref={emailRef} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
                                <Form.Text className="text-muted">
                                Your Email is private with us
                                </Form.Text>
                                </Form.Group>

                            </Col>

                            <Col md={6} className='p-0 p-md-1'>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{marginLeft:'0px'}}>Subject</Form.Label>
                            <Form.Control type="text" ref={subjectRef} required name="subject" onChange={(e)=>setSubject(e.target.value)} placeholder="Enter Subject" />
                            <Form.Text className="text-muted">
                            What do you want to ask about?
                            </Form.Text>
                            </Form.Group>
                            
                            </Col>
                        </Row>    



                        <Row className='m-0'>

                        <Form.Group className="mb-3 p-0" controlId="formBasicPassword">
                            <Form.Label style={{marginLeft:'0px'}}>Message</Form.Label>
                            <Form.Control required type="text" ref={messageRef} name="message" onChange={(e)=>setMessage(e.target.value)} placeholder="mention your message" />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{background:"black", color:'white', borderRadius:"0px"}}>
                        {!load && ('Send Message')}{load && (<Spinner size="sm" variant='warning' animation="border" style={{marginTop:'4px'}} />)}
                        </Button>
                            
                        </Row>    


                        </Form>
                  </Col>

                 

                </Row>

               


              

              

            </Container>
            
        </AuthComponent>
       
    )
}

export default PlaceView;