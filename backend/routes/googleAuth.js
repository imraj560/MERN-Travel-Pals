const passport = require('passport');
const express = require('express')
const router = express.Router()

//Routes start here
router.get('/google',
  passport.authenticate('google',{ scope: ['profile','email'], prompt: "select_account" }));

  
  router.get(
    '/google/callback',
    passport.authenticate('google',{ session: false }),
    (req,res)=>{

      res.cookie('user',req.user, {
        httpOnly: true, // Ensures cookies are only accessible via HTTP(S)
        secure: true,   // Ensures cookies are sent only over HTTPS
        sameSite: "None", // Prevents cross-site request forgery (CSRF)

        

      });

      //res.redirect('http://localhost:3000')
      res.redirect('https://travelpals-560.netlify.app/')

    }
  );


  router.get("/protected", (req, res) => {
    const user = req.cookies.user
    if (user) {
      res.send({'user':user});
    } else {
      res.status(401).send("Unauthorized!");
    }
  });

  router.get("/clear-cookie", (req, res) => {
    
    res.clearCookie("user", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.send("Cookie has been cleared!");
  });


router.get('/logout',(req,res)=>{

    req.logout();
    res.redirect('https://travelpals-560.netlify.app/')
})

module.exports = router;




