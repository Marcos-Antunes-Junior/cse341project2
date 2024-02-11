const db = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()
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
    })
    try {
      const existingUser = await Users.findOne({ email: req.body.email })
      if(existingUser) {
        return res.status(400).json({ errors: "Email exists. Please, log in or use a different email" })
      }
      await users
      .save()
      .then((data) => {
        return res.status(201).send({ message: 'Account created. Please log in.', data});
      })
  
    }catch (err) {
        console.log(err);
        res.status(500).send({
          message: err.message || "Some error ocurred while creating user.",
        });
      };
  };

const userLogin = async (req, res) => {
const { email, password } = req.body;
if(!email || !password) {
res.status(400);
throw new Error('All fields are mandatory!')   
}
const user = await Users.findOne({ email });
try {
if(user && (await bcrypt.compare(password, user.password))){
    delete user.password
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
    res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
    return res.redirect("/")
} else {
res.send("Email or password is not valid");    
}
} catch (error) {
res.status(401)
throw new Error("Email or password is not valid");
}
}

const userLogout = async (req, res) => {
res.clearCookie("jwt");
req.logOut();
console.log('Success! User logged out.');
return res.redirect('/')
}


const updateAccount = async (req, res) => {
    const _id = req.params.id;
    const user = {
      username: req.body.username,
      email: req.body.email,
    };
    try{
    const updatedAcc = await Users.findByIdAndUpdate(_id, user, { new: true});
    if(!updatedAcc) {
      return res.status(404).send({message: 'No user account found with id ' + _id})
    }

    return res.status(200).json(updatedAcc);
    
    } catch (err) {
    return res.status(500).send({ message: 'Error updating user account: ' + err.message});
    }
  };

module.exports = { createAccount, userLogin, userLogout, updateAccount}