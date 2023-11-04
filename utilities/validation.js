
const {body, validationResult} = require("express-validator")
const validate = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

validate.employeeDataValidation = () =>{
    return [
        body("firstName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), 

        body("lastName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a last name."), 

        body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required."),

        body("phoneNumber")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Please provide a phone number."),

        body("birthday")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Invalid date."),

        body("jobPosition")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please, provide a job position."),

        body("salary")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please, provide a salary."),
    ]
}


validate.checkEmployeeData = async (req, res, next) => {
    const { fisrtName, lastName, email, phoneNumber, birthday, jobPosition, salary } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
    res.json(errors)
    return
    }
    next()
}

validate.registrationRules = () => {
    return [
    body("username")
    .trim()
    .isLength({ min: 1})
    .withMessage("Please, provide a username."),

    body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required."),

    body("account_password")
    .trim()
    .isStrongPassword({
        maxLength: 16,
        minLength: 8,
    })
    .withMessage("The password must be 8 to 16 characters long"),
    ]
 }

 validate.checkRegisterData = async (req, res, next) => {
    const { username, email } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
    res.json(errors)
    return
    }
    next()
}


validate.updateRules = () => {
    return [
    body("username")
    .trim()
    .isLength({ min: 1})
    .withMessage("Please, provide a username."),

    body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required."),
    ]
 }

 validate.checkUpdateData = async (req, res, next) => {
    const { username, email } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
    res.json(errors)
    return
    }
    next()
}


validate.authCheck = async (req, res, next) => {
    if(req.user){
    next();
    } else if(req.cookies.jwt) {
        jwt.verify(
            req.cookies.jwt,
            process.env.ACCESS_TOKEN_SECRET,
            function (err, user) {
             if (err) {
             console.log(err)
             }
             next()
            })
    } else {
    return res.send('Sorry, you must first log in before using the system!') 
    }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
validate.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)












module.exports = validate;
