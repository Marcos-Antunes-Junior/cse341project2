const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController')
const validate = require('../utilities/validation')

router.use('/', require('./swagger'));
router.use('/employees', require('./employees'));
router.get('/', validate.handleErrors(baseController.buildHome))

module.exports = router