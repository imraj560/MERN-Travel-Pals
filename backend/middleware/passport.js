const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const createToken = (_id)=>{

  return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'});
}

passport.use(
  new GoogleStrategy(
    {
      clientID: "191257029905-fo9127ofo2rsiqh5265213s3o78vh36q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://mern-exercise-tracker-production.up.railway.app/auth/google/callback",
    scope:["profile", "email"]
    },
    async(accessToken, refreshToken, profile, done) => {

      try {

        let userr = await User.findOne({ email: profile.emails[0].value });

        if (!userr) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password:'N/A'
           
          });
        }

        const token = createToken(userr._id);

        const user = {
          email: profile.emails[0].value,
          username: profile.displayName,
          token
       };

        done(null, user); // Pass the user to Passport

      } catch (error) {
        done(error, null); // Handle errors
      }
    }
  )
);

passport.serializeUser( (user, done) => {
    done(null, user)
 })
 
 passport.deserializeUser((user, done) => {
   done (null, user)
 })

module.exports = passport;