import {useEffect, useState} from 'react';
import { ChatQuote, ChatQuoteFill, ReplyFill, Trash3,XCircle, XCircleFill, PersonDash } from 'react-bootstrap-icons';
import { Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { UseReplyContext } from '../../hooks/UseReplyContext';
import {toast} from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner';

const Reply = ({commentId})=>{

    const [content, setContent] = useState()
    const {user} = UseAuthContext();
    const {reply, dispatch} = UseReplyContext()
    const [responsee, setResponsee] = useState(false);
    const [loading, setLoading] = useState(false)
    const [delload, setDelload] = useState(false)
    const [visibleComponentId, setVisibleComponentId] = useState(null);
    const [auth, setAuth] = useState(false);

   /**Post a reply */ 
   const handleReply = async(e)=>{

        e.preventDefault()
        setResponsee(true)

        if(user){

            const response = await fetch('http://localhost:4000/api/workout/reply', {

                method : 'POST',
                body : JSON.stringify({commentId, content}),

                headers: {

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }
                        
            })

            const json = await response.json();

            if(response){
                setResponsee(false)
                dispatch({type: 'CREATE_REPLY', payload: json.reply})
                setContent('')
            }

        }else{
            setResponsee(false)
            toast.warning('Please Log In')
            setContent('')
        }
       
   }

   /**delete Reply */

   const deleteReply = async(id)=>{


    setVisibleComponentId(id)
    setDelload(true)

    if(user){

        //const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/deleteReply/'+id, {
          const response = await fetch('http://localhost:4000/api/workout/deleteReply/'+id, {


                method: 'DELETE',
                headers:{
                    
                    'Authorization' : `Bearer ${user.token}`
                }
            })


            const json = await response.json();

            if(response.ok){
                    setDelload(false)
                    dispatch({type: 'DELETE_REPLY', payload: json.reply})
                    console.log('reply state', reply)
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

   /**fetch reply */
   useEffect(()=>{
    
    const apiFetch = async()=>{

        const data = await fetch(`http://localhost:4000/api/workout/replylist/${commentId}`,{

            method: 'GET',
            headers: {'Content-Type': 'application/json'},
 
           }).then((response)=>{
 
               return response.json()
 
           }).then((data)=>{
               
                console.log(data)
               dispatch({type: 'SET_REPLY', payload: data.reply})
 
               setLoading(false)
              
             console.log('ReplyList is:', reply)
               
 
           }).catch((error)=>{
 
               console.log("The error is:", error)
           })


       
    }

    apiFetch()

   }, [])

    return (

        <Col md={12} style={{paddingLeft:"10px", marginTop:'10px'}}>

                 {loading && <p>Loading Replies ..</p>}           
               
                {
                
                (!loading && reply) && reply.map((singleReply)=>{

                    return (

                        <Col md={12}>
                        <p style={{fontSize:"13px", margin:'0px', marginBottom:'5px'}}> 
                            
                            <ChatQuoteFill style={{marginRight:"6px"}}/><span>{singleReply.name}</span> - {singleReply.content} 
                            <XCircleFill onClick={()=>deleteReply(singleReply._id)} color='gray' className='float-end' style={{cursor:'pointer'}}/>
                            {(auth && visibleComponentId === singleReply._id) && <PersonDash style={{marginRight:'4px'}} className='float-end' color='red'/> }
                            {(delload && visibleComponentId === singleReply._id) && (<Spinner className='float-end' style={{marginRight:'5px', fontSize:'4px'}} animation="border" role="status" variant='danger' size='sm'></Spinner>)}
                            

                        </p>
                        
                        </Col>
                    )
                })
                
                }
                
               
                <Form style={{padding:'5px 15px', height:'55px'}} onSubmit={handleReply}>
                <Row>
                    <Col md={10} sm={10} xs={10} style={{padding:'0 2px 0 0'}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control value={content} onChange={(e)=>setContent(e.target.value)} required style={{padding:'0px 15px', height:'32px', fontSize:'13px'}} name='content' type="text" placeholder="Your reply" />
                    </Form.Group>
                    </Col>
                    <Col md={2} sm={2} xs={2} style={{padding:'0'}}>
                    <Button type='submit'  style={{width:'100%', height:'41px', border:'none', background:'white', cursor:"pointer"}} variant="secondary">
                       
                        {!responsee && ( <ReplyFill color='black'/>)}{responsee && (<Spinner size="sm" variant='warning' animation="border" style={{marginTop:'4px'}} />)}
                    </Button>
                    </Col>
                </Row>
                
                
                </Form>

         </Col>
    )



}

export default Reply;