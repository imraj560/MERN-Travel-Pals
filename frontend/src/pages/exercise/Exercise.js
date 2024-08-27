import React, { useEffect, useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { NavLink } from 'react-router-dom';
import './Exercise.css';
import WorkoutCard from '../../components/workoutcards/WorkoutCard';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { PersonCircle, PlusCircle, EmojiSmile, Filter } from 'react-bootstrap-icons';



const Exercise = ()=>{

    /**We have used use state for local access of data */
    // const [workouts, setWorkout] = useState([]);

    /**Now lets invoke the reducers for global access */
    const {workouts, dispatch} = UseWorkoutsContext();
    const [search, setSearch] = useState('');
    const [filteredWorkouts, setFilteredWorkouts] = useState()
    const [filterTags, setFilterTags] = useState([]);
    const [loader, setLoader] = useState(true);


    console.log('filtered Data', filteredWorkouts)
  

    const { user } = UseAuthContext()

    /**Api call to get Workout Data */
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
                setFilteredWorkouts(data)
                setLoader(false)

            })
        }

        if(user){

             fetchApiData();
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
        const newCheckedWorkouts = workouts.filter((workout) =>
          filterTags.length > 0
            ? filterTags.some((filterTag) => workout.wtype.includes(filterTag))
            : workouts
        );
        setFilteredWorkouts(newCheckedWorkouts);
      }, [filteredWorkouts, filterTags]);



 
  
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

        {!loader && <Row className='mt-4'>
        
            {
            
                
                
                filteredWorkouts && filteredWorkouts.map((singleWorkout)=>{

                    return (
                    
                        <WorkoutCard key={singleWorkout._id} props={singleWorkout} />
                    )
                })
            }

        </Row>}


    </Container>   


    </AuthComponent>
    
        
    )
}

export default Exercise;