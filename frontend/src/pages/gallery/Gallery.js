import './Gallery.css'
import { useState, useRef, useEffect } from 'react'; 
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { UseGalleryContext } from '../../hooks/UseGalleryContext';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { IoIosAddCircleOutline } from "react-icons/io";




const Gallery = ()=>{

    const[file, setFile] = useState(null)
    const [load, setLoad] = useState(false);
    const [pload, setPload] = useState(false)
    const [dload, setDload] = useState(false)
    const [visibleComponentId, setVisibleComponentId] = useState(null);
    const { user } = UseAuthContext();
    const params = useParams()
    const fileInputRef = useRef(null);
    const {gallery, dispatch} = UseGalleryContext();



    /**Save Gallery Image */
    const handleSubmit = async(e)=>{

        e.preventDefault();

        setPload(true)

        const formData = new FormData();
 
        formData.append('file',file)


        //const response = await fetch(`http://localhost:4000/api/place/gallery/${params.id}`, {
        const response = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/gallery/${params.id}`, {    
            method: 'POST',
            body: formData,

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){

        }  

        if(response.ok){

            fileInputRef.current.value = "";
            toast.success('Image Added to Gallery');
            dispatch({type: 'CREATE_GALLERY', payload: json.gallery})
            setPload(false)

            
        }

    }

    /**Fetch Gallery Image */
    useEffect(()=>{

        const fetchApiData = async ()=>{

            setLoad(true)

            //const data = await fetch(`http://localhost:4000/api/place/gallery/${params.id}`, {
            const data = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/place/gallery/${params.id}`, {

                method: 'GET',
                headers:{

                    'Content-Type' : 'application/json',
                   
                    
                }
            }).then((response)=>{

                return response.json()


            }).then((data)=>{

                dispatch({type: 'SET_GALLERY', payload: data})
                setLoad(false)
            })
        }

        fetchApiData()

    },[])

    /**Delete Single Gallery Image */

    const deleteImage = async(e, id)=>{

        e.preventDefault()

        setVisibleComponentId(id)

        setDload(true)
        const response = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/place/gallery'+ id, {
        //const response = await fetch('http://localhost:4000/api/place/gallery/'+ id, {
    
    
                method: 'DELETE',
    
                headers:{
                    
                    'Authorization' : `Bearer ${user.token}`
                }
            })
    
    
            const json = await response.json();
    
            if(response.ok){
    
                    dispatch({type:"DELETE_GALLERY", payload: json});
    
                    setDload(false)
    
                    toast.error('Place Deleted');
    
            }

    }

    return (

        <AuthComponent>
            <Container>
                <Row id="profile_gallery_title">
                    <h2>Location Gallery</h2>
                </Row>

                <Row id="profile_gallery">

                    <Col lg={3} md={12} sm={12}>

                        <Card style={{marginBottom:'20px'}}>
                        <Card.Header as="h5" style={{background:"black", color:'white'}}><IoIosAddCircleOutline /> Add Image</Card.Header>
                        <Card.Body>
                             <Form onSubmit={handleSubmit} style={{padding:'10PX 5px 5px 5px', paddingRight:'5PX'}}>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control required type="file" id='image_file' ref={fileInputRef} name="file"  onChange={(e)=> setFile(e.target.files[0])} />
                                </Form.Group>
                                
                                <Button type="submit" variant="secondary" style={{borderRadius:'5px', background:"black", color:'white', width:'100%'}}>
                                {!pload && ('Post')}{pload && (<Spinner size="sm" variant='warning' animation="border" style={{marginTop:'4px'}} />)}
                                </Button >
                             </Form> 
                        </Card.Body>
                               
                        </Card>

                       

                    </Col>

                    <Col lg={9} md={12} sm={12}>

                    {load && (<Spinner size="sm" animation='grow' />)}

                    <Row id="gallery_div">
                       


                        { !load && (

                             gallery && gallery.map((single_image)=>{

                                    return (
                                        
                                        <Col id="image_col" style={{padding:'2px', height:"400px"}} md={6} lg={4} sm={12}>
                                        <div id="action_div">
                                                <MdDeleteForever style={{color:"white"}} onClick={(event)=> deleteImage(event, single_image._id)}/>
                                                {(dload && visibleComponentId === single_image._id) && <Spinner size="sm" variant='danger'/>}
                                        </div>
                                        <Image  height='100%' width="100%" src={"https://mern-exercise-tracker-production.up.railway.app/api/place/download/"+single_image.image} />
                                        {/* <Image  height='100%' width="100%" src={"http://localhost:4000/api/place/download/"+single_image.image} /> */}
                                        </Col>
                                    )
                                })
                        )
                               
                         }
                    </Row>

                    

                   
                    </Col>
                   
                </Row>
            </Container>
        </AuthComponent>

       
    )
}

export default Gallery;