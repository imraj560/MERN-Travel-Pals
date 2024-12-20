require('dotenv').config();
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
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "https://mern-exercise-tracker-production.up.railway.app/auth/google/callback",
      //callbackURL: "http://localhost:4000/auth/google/callback",
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