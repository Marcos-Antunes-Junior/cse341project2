const express = require('express');
const router = express.Router();
const validate = require('../utilities/validation');
const passport = require('passport')


//login - In progress
//router.get('/login')

//logout 
router.get('/logout', validate.authCheck, (req, res) => {
 req.logout();
 console.log('Success! User logged out.');
 res.redirect('/')
})


//Oauth with Google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

// callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
console.log('Sucess! User logged in.')
res.redirect('/')
})



module.exports = router;