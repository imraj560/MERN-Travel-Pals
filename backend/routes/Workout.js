const express = require('express');
const Workout = require('../models/workoutModel');

const router = express.Router();

//GET all your workouts
router.get('/' ,(req, res) => {

    res.json({mssg: 'Get all workouts please'}) 
})

//GET a single workout
router.get('/:id', (req, res)=>{

    res.json({mssg: 'get a single workout'})
})

//POST a new workout
router.post('/', async(req, res)=>{

    const {title, load, reps} = req.body;

    try{

        const workout = await Workout.create({title, load, reps});

        res.status(200).json(workout);

    }catch(error){

        res.status(400).json({error:error.message});
    }

    
})

//DELETE a workout
router.delete('/:id', (req, res)=>{

    res.json({mssg: 'post deleted'})
})

//UPDATE/PATCH a workout
router.patch('/:id', (req, res)=>{

    res.json({mssg: 'workout updated'})
})



module.exports = router;