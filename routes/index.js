const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController')

router.use('/', require('./swagger'));
router.use('/employees', require('./employees'));
router.get('/', baseController.buildHome)

module.exports = router