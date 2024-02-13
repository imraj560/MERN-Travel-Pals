const express = require('express');
const { newWorkout, allWorkout, findWorkout, deleteWorkout, updateWorkout, homeWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer')
const router = express.Router();


/**Multer methods for image upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/all', homeWorkout)


/**the below middleware prevents unauthorized access */
router.use(requireAuth)


/**All routes */
//GET all your workouts
router.get('/', allWorkout);

//GET a single workout
router.get('/:id', findWorkout);

//POST a new workout
router.post('/', upload.single('file'), newWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE/PATCH a workout
router.patch('/:id', upload.single('file'), updateWorkout);



module.exports = router;