import React, { useEffect, useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { NavLink } from 'react-router-dom';
import './Exercise.css';
import WorkoutCard from '../../components/workoutcards/WorkoutCard';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { PersonCircle, PlusCircle, EmojiSmile, Filter } from 'react-bootstrap-icons';



const Exercise = ()=>{

    /**We have used use state for local access of data */
    // const [workouts, setWorkout] = useState([]);

    /**Now lets invoke the reducers for global access */
    const {workouts, dispatch} = UseWorkoutsContext();
    const [search, setSearch] = useState('');
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
    const [filterTags, setFilterTags] = useState([]);
    const [loader, setLoader] = useState(true);
    const [likes, setLikes] = useState('');
    const [dislikes, setDislikes] = useState('');


    console.log('filtered Data', filteredWorkouts)
  

    const { user } = UseAuthContext()

    /**Get workout data */
    useEffect(()=>{

        const fetchApiData = async()=>{

            let data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/profile',{ 
            //let data = await fetch('http://localhost:4000/api/workout/profile',{     

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                dispatch({type: 'SET_WORKOUTS', payload: data})
                console.log('workoutscontextdata', workouts)
                setLoader(false)
               console.log('UserProfile',data)

            })
        }

        const fetchtotalReactions = async()=>{

            //let data = await fetch('https://mern-exercise-tracker-production.up.railway.app/api/workout/total',{ 
            let data = await fetch('http://localhost:4000/api/workout/total',{     

                headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                    
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

               
               console.log('Reactions',data[0].totalLikeslength)

               setLikes(data[0].totalLikeslength)
               setDislikes(data[0].totalDislikeslength)

            })
        }

        if(user){

             fetchApiData();
             fetchtotalReactions();
        }
       

    }, [dispatch])

    /**Search Functionality */
     const onSearchChange = (event)=>{

         const searchFilterString = event.target.value.toLocaleLowerCase();
         setSearch(searchFilterString);

     }

    useEffect(()=>{

        if(workouts !== null){

            const filteredWorkouts = workouts.filter((workout)=>{

            return workout.title.toLocaleLowerCase().includes(search);
        })

        setFilteredWorkouts(filteredWorkouts);


        }

        

        
    },[search, workouts]);

    const onCheckChange = (event) => {

        if(event.target.checked){
      
          setFilterTags((prev)=>[...prev,event.target.value]);
      
          
        }else{
      
          setFilterTags(
            filterTags.filter((filterTag) => filterTag !== event.target.value)
          )
      
        }
      
      }


      useEffect(() => {

        if(workouts !== null){
        
        const newCheckedWorkouts = workouts.filter((workout) =>
          filterTags.length > 0
            ? filterTags.some((filterTag) => workout.wtype.includes(filterTag))
            : workouts
        );

        setFilteredWorkouts(newCheckedWorkouts);

    }

      }, [filterTags, workouts]);



 
  
    return (

    <AuthComponent>

   

     <Container className='mt-5'>

        <Row>
        <Col md={12}>
           <h2><NavLink style={{textDecoration:'none', color:'black'}} to={'/'}>Hi {user.name} <EmojiSmile/></NavLink></h2>
        </Col>
        </Row>

        <Row className='mt-5'>

            <Col md={3} className='p-1'>
            <Button variant="secondary" size="lg" className='w-100'>
            <NavLink to="/add" style={{textDecoration:'none', color:'black'}}><PlusCircle/> Add </NavLink>
            </Button>
            </Col>

            <Col md={9} className='p-1'>
            
            <Form className='m-0 p-0'>
            <Form.Group controlId="exampleForm.ControlInput1" className='w-100'>
                <Form.Control className='rounded m-0 w-100' type="search" value={search} id="search" onChange={onSearchChange} placeholder="Search Workout" />
            </Form.Group> 
            </Form>

            <Form className='mt-3 p-0'>
            <div key="inline-checkbox">
            <Filter className='float-start'/><br />
            <Form.Check
                inline
                label="Weights"
                onChange={onCheckChange}
                value="weight"
               
            />
            <Form.Check 
                inline
                label="Cardio"
                onChange={onCheckChange}
                value="cardio"
            />
            <Form.Check
                inline
                label="calesthenics"
                onChange={onCheckChange}
                value="calesthenics"
              
            />
            </div>
      
        </Form>

            </Col>

        </Row>
       
        {loader &&  (

            <Button variant="default" disabled>
            <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            Loading...
            </Button>
            )}

        <Row>

            <Col md={3} style={{padding:"5px"}}>

            <Button variant="danger" style={{width:"48%", marginRight:'4px'}}>
            Likes <Badge bg="secondary">{likes}</Badge>
            <span className="visually-hidden">unread messages</span>
            </Button>

            <Button variant="primary" style={{width:'48%'}}>
            Dislikes <Badge bg="secondary">{dislikes}</Badge>
            <span className="visually-hidden">unread messages</span>
            </Button>


            </Col>

            <Col md={9}>

                {!loader && <Row className='mt-4'>
                
                {
                
                    
                    
                    filteredWorkouts && filteredWorkouts.map((singleWorkout)=>{

                        return (
                        
                            <WorkoutCard key={singleWorkout._id} props={singleWorkout} />
                        )
                    })
                }

                 </Row>}

            </Col>
            
        </Row>    

       


    </Container>   


    </AuthComponent>
    
        
    )
}

export default Exercise;