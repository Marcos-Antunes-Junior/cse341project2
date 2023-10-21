const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db('project2').collection('employees').find();
    result.toArray().then((lists) => {
    if(lists.length === 0){
    res.status(404).json(result.error || 'No data was found.');
    } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    }
    })    
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('employees').find({ _id: userId });
    result.toArray().then((lists) => {
      if(lists.length === 0){
      res.status(404).json(result.error || 'No data was found.'); 
      } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      }
    });
  };
  
  const createEmployee = async (req, res) => {
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      jobPosition: req.body.jobPosition,
      salary: req.body.salary
    };
    const response = await mongodb.getDb().db('project2').collection('employees').insertOne(employee);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the employee.');
    }
  };


  const updateEmployee = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      jobPosition: req.body.jobPosition,
      salary: req.body.salary
    };
    const response = await mongodb
      .getDb()
      .db('project2')
      .collection('employees')
      .replaceOne({ _id: userId }, employee);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
  };

  const deleteEmployee = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project2').collection('employees').deleteOne({ _id: userId}, true)
    console.log(response)
    if(response.deletedCount > 0) {
    res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting the employee data')
    }
  }



  module.exports = {getAll, getSingle, createEmployee, updateEmployee, deleteEmployee}