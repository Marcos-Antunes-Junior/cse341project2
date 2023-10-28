const db = require('../models');
const Employees = db.employees;



const getAll = async (req, res) => {
    Employees.find({})
    .then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    }) 
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving contacts.',
      });
    });   
};


const getSingle = async (req, res) => {
  const _id = req.params.id;
    Employees.findById({_id})
    .then((data) => {
      if (!data) {
        res
        .status(404)
        .send({ message: 'Not contact found with id ' + _id });
      } else {
        res.status(200).send(data);
      }
  })
  .catch((err) => {
    res.status(500).send({
      message: 'Error retrieving contact with id ' + _id,
    });
  });
  };
  
  
  const createEmployee = async (req, res) => {
    const employee = new Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      jobPosition: req.body.jobPosition,
      salary: req.body.salary
    });
    await employee.save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.'
      });
    });
  };


  const updateEmployee = async (req, res) => {
    const _id = req.params.id;
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      jobPosition: req.body.jobPosition,
      salary: req.body.salary
    };
    try{
    const updatedEmployee = await Employees.findByIdAndUpdate(_id, employee, { new: true});
    if(!updatedEmployee) {
      return res.status(404).send({message: 'No employee found with id ' + _id})
    }

    return res.status(200).json(updatedEmployee);
    
    } catch (err) {
    return res.status(500).send({ message: 'Error updating employee: ' + err.message});
    }
  };

 
  const deleteEmployee = async (req, res) => {
    const _id = req.params.id;
    Employees.deleteOne({_id: _id})
    .then((data) => {
    if(data.deletedCount > 0) {
    res.status(200).send();
    console.log(data) 
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting the employee data')  
    }
    })
  }



  module.exports = {getAll, getSingle, createEmployee, updateEmployee, deleteEmployee}