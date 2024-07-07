import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseWorkoutsContext } from '../../hooks/UseWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../../hooks/UseAuthContext';
import { AuthComponent } from '../../components/AuthComponent';
import { Oval } from 'react-loader-spinner'
import './EditForm.css';

const EditForm = ()=>{

    const {dispatch} = UseWorkoutsContext();
    const navigate = useNavigate();
    const params = useParams();

    const [title, setTitle] = useState('');
    const[file, setFile] = useState(null)
    const[oldImage, setOldImage] = useState('')
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const { user } = UseAuthContext();

    

    useEffect(()=>{

        const apiDataFetch = async()=>{

            const data = await fetch(`http://localhost:4000/api/workout/${params.id}`, {

                  headers:{

                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }

            }).then((response)=>{

                return response.json();

            }).then((data)=>{

                setTitle(data.title);
                setLoad(data.load);
                setReps(data.reps);
                setOldImage(data.image);
                setFile(data.image);

            })

        }

        if(user){

             apiDataFetch();
        }

           
        

        

    },[])

    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoader(true)

        if(!user){

            return
        }
        
        // const workout = {title, load, reps};
        const formData = new FormData();

        formData.append('title',title)
        formData.append('load',load)
        formData.append('reps',reps)
        formData.append('file',file)
        formData.append('oldimage',oldImage)

        //const response = await fetch(`http://localhost:4000/api/workout/${params.id}`, {
        const response = await fetch(`https://mern-exercise-tracker-production.up.railway.app/api/workout/${params.id}`, {    
            method: 'PATCH',
            body: formData,

            headers:{
                
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){

            setError(json.error);
            setLoader(false)
        }

        if(response.ok){

            setError(null);
            setTitle('');
            setLoad('');
            setReps('');

            dispatch({type:'UPDATE_WORKOUT', payload: json});

            navigate('/exercise');
        }

    }

    return (

            <AuthComponent>
                <div id="EditContainer">

                {loader &&  (

                    <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="black"
                    margin="auto"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass="loader"
                    />
                    )}

                    {!loader && <div id="EditFormContainer">

                    <p>Edit Workout</p>

                    <form onSubmit={handleSubmit}  encType='multipart/form-data'>
                        <input type="text" required value={title} name="title" placeholder="Name your workout" onChange={(e)=> setTitle(e.target.value)} />
                        <p style={{textAlign:'left', fontSize:'14px', marginBottom:'10px', marginLeft:'10px'}}>Edit Workout Image</p>
                        <img src={process.env.PUBLIC_URL+"/images/"+oldImage} width={80} height={80} style={{marginLeft:'10PX', marginBottom:'5px'}}/>
                        <input type="file" name="file" onChange={(e)=> setFile(e.target.files[0])} />
                        <input type="number" required value={reps} name="reps" placeholder="Enter Reps" onChange={(e)=> setReps(e.target.value)} />
                        <input type="number" required value={load} name="load" placeholder="Enter Weight" onChange={(e)=> setLoad(e.target.value)} />
                        <button type="submit">Save changes</button>
                    </form>
                   
                </div>}

                

           </div>
        
            </AuthComponent>
           
    )
}

export default EditForm;