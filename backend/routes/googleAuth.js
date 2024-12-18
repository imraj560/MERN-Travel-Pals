const passport = require('passport');
const express = require('express')
const router = express.Router()

//Routes start here
router.get('/google',
  passport.authenticate('google',{ scope: ['profile','email'] }));

  
  router.get(
    '/google/callback',
    passport.authenticate('google',{ session: false }),
    (req,res)=>{

      console.log(req.user)
      res.cookie('user',req.user);
      res.redirect('https://creative-bunny-7517e7.netlify.app')

    }
  );


router.get('/logout',(req,res)=>{

    req.logout();
    res.redirect('https://creative-bunny-7517e7.netlify.app')
})

module.exports = router;




