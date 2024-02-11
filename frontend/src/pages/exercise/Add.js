import React, { useState } from 'react';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { AuthComponent } from '../../components/AuthComponent';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import {toast} from 'react-toastify'
import './Add.css';

const Add = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const { user } = UseAuthContext()

    const [title, setTitle] = useState('');
    const[file, setFile] = useState('')
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e)=>{

        e.preventDefault();

        if(!user){

            return
        }
        
    
        // const workout = {title, load, reps, file};

        const formData = new FormData();

        formData.append('title',title)
        formData.append('load',load)
        formData.append('reps',reps)
        formData.append('file',file)

        // formData.forEach(element => {

        //     console.log('form data' ,element)
            
        // });


        const response = await fetch('https://exercise-tracker-8ddy.onrender.com/api/workout/', {

            method: 'POST',
            body: formData,

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error);
        }

        if(response.ok){

           
            // setTitle('');
            // setLoad('');
            // setReps('');
            // setFile('')
            setError(null);
            dispatch({type:'CREATE_WORKOUTS', payload: json});
            toast.success('Workout Added')
            navigate('/exercise');
        }

    }

    return (

           <AuthComponent>
             <div id="Add_Form_Container">

                <div id="Form_Container">

                    <p>Add Workout</p>

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        
                        <input type="text" required value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                        <p style={{textAlign:'left', fontSize:'14px', marginBottom:'10px', marginLeft:'10px'}}>Choose Workout Image</p>
                        <input type="file" required name="file" onChange={(e)=> setFile(e.target.files[0])} />
                        <input type="number" required value={reps} name="reps" placeholder="Enter Reps" onChange={(e)=> setReps(e.target.value)} />
                        <input type="number" required value={load} name="load" placeholder="Enter Weight" onChange={(e)=> setLoad(e.target.value)} />
                        <button type="submit">Create Workout</button>
                    </form>
                   
                </div>

           </div>
           </AuthComponent>
          
        
    )
}

export default Add;