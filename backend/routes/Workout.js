const express = require('express');

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
router.post('/', (req, res)=>{

    res.json({mss: 'new workout posted'})
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