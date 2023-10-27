const express = require('express');
const router = express.Router();
const validate = require('../utilities/validation');


//login
router.get('/login')

//logout
router.get('/logout')

//Oauth with Google
router.get('/google')


module.exports = router;