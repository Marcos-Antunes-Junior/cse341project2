const express = require('express');
const router = express.Router();
const validate = require('../utilities/validation');
const passport = require('passport')


//login - In progress
//router.get('/login')

//logout - in progress
//router.get('/logout')


//Oauth with Google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

// callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
console.log('Success!')
})



module.exports = router;