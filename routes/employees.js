const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

router.get('/', employeesController.getAll);

router.get('/:id', employeesController.getSingle);

router.post('/', employeesController.createEmployee);

module.exports = router;