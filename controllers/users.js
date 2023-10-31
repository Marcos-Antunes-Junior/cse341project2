const db = require('../models');
const bcrypt = require('bcryptjs')
const Users = db.users;

const createAccount = async (req, res) => {
    let hashedPassword
    try{
    // Regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(req.body.password, 10)
    } catch (error) {
    console.log(error)
    }
    const users = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    accountType: req.body.accountType,
    });
    await users.save().then((data) => {
    console.log(data)
    res.status(201).send(data);
    })
    .catch((err) => {
    res.status(500).send({
    message: err.message || 'Some error occurred while creating user.'
    })
    })
}


module.exports = { createAccount }