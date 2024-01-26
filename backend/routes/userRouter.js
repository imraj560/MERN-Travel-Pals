const express = require('express')
const router = express.Router()
const {loginUser, signupUser} = require('../controllers/userController')

/**This is login route */
router.post('/login', loginUser)

/**This is singup route */
router.post('/signup', signupUser)

module.exports = router;