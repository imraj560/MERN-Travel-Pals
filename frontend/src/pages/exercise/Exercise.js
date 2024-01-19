import './Exercise.css';

const Exercise = ()=>{

    return (

    
           <div id="container">

                <div id="formContainer">

                    <p>Add Workout</p>

                    <form>
                        <input type="text" name="title" placeholder="Name your workout" />
                        <input type="number" name="reps" placeholder="Enter Reps" />
                        <input type="number" name="load" placeholder="Enter Weight" />
                        <button type="submit">Create Workout</button>
                    </form>
                   
                </div>

           </div>
        
    )
}

export default Exercise;