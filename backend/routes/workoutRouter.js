const express = require('express');
const { newWorkout, allWorkout, findWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

/**the below middleware prevents unauthorized access */
router.use(requireAuth)
//GET all your workouts
router.get('/', allWorkout);

//GET a single workout
router.get('/:id', findWorkout);

//POST a new workout
router.post('/', newWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE/PATCH a workout
router.patch('/:id', updateWorkout);



module.exports = router;