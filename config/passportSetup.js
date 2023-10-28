const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const db = require('../models');
const User = db.user;

passport.use(new GoogleStrategy ({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cse341project2-bkgg.onrender.com/auth/google/redirect'

}, (req, accessToken, refreshToken, profile, done) => {
    
    
    console.log(profile)
    new User({
     username: profile.displayName,
     googleId: profile.id  
    }).save().then((newUser) => {
    console.log('new user created: ' + newUser)    
    })
}

));

