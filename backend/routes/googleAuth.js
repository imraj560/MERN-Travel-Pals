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
      res.cookie('user',req.user, {
        httpOnly: true, // Ensures cookies are only accessible via HTTP(S)
        secure: true,   // Ensures cookies are sent only over HTTPS
        sameSite: "strict", // Prevents cross-site request forgery (CSRF)
        maxAge: 24 * 60 * 60 * 1000, // 1 day

      });
      res.redirect('https://creative-bunny-7517e7.netlify.app')

    }
  );


router.get('/logout',(req,res)=>{

    req.logout();
    res.redirect('https://creative-bunny-7517e7.netlify.app')
})

module.exports = router;




