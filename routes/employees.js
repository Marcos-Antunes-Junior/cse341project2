const express = require('express');
const router = express.Router();
const validate = require('../utilities/validation')
const employeesController = require('../controllers/employees');

router.get('/', validate.handleErrors(employeesController.getAll));

router.get('/:id', validate.handleErrors(employeesController.getSingle));

router.post('/', validate.employeeDataValidation(), validate.checkEmployeeData, validate.handleErrors(employeesController.createEmployee));

router.put('/:id', validate.employeeDataValidation(), validate.checkEmployeeData, validate.handleErrors(employeesController.updateEmployee));

router.delete('/:id', validate.handleErrors(employeesController.deleteEmployee))

module.exports = router;