
const {body, validationResult} = require("express-validator")
const validate = {}

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

validate.authCheck = async (req, res, next) => {
    if(!req.user){
    res.send('Sorry, you must first log in before using the system!')
    } else {
        next();
    }
}




/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
validate.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = validate;
