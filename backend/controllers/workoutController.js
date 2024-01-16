const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

/**All the functions for the API CRUD functionality */

//Add a single workout
const newWorkout = async(req, res) => {

    const {title, reps, load} = req.body;

    try{

         const workout = await Workout.create({title, reps, load});
         res.status(200).json(workout);

    }catch(error){

        res.status(400).json({error:error.message});
    }
   
}

//Grab all  workout
const allWorkout = async(req, res) => {

    const workouts = await Workout.find({});

    res.status(200).json(workouts);
}

//Grab workout by ID
const findWorkout = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'Invalid mongoId'});
    }

    const workout = await Workout.findById(id);

    if(!workout){

        return res.status(404).json({error:'No such workouts found'});
    }

    return res.status(200).json(workout);


}

//Delete a workou
const deleteWorkout = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).error({error: 'Invalid mongoose Id'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){

        res.status(400).json({error: 'No such Rercord Found'});
    }

    res.status(200).json(workout);
}

//Update a workout
const updateWorkout = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        res.status(404).error({error: "Invalid mongoose Id"});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});

    if(!workout){

        return res.status(400).json({error: 'Update unsuccessfull'});
    }

    return res.status(200).json(workout);
}

module.exports = {

    newWorkout,
    allWorkout,
    findWorkout,
    deleteWorkout,
    updateWorkout
}