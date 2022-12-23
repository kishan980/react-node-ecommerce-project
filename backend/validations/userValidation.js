const { body, validationResult} = require("express-validator");
module.exports.registerValidations =[
    body('name').not().isEmpty().trim().escape().withMessage("Name is required!"),
    body('email').isEmail().normalizeEmail().not().isEmpty().trim().escape().withMessage("Email is required!"),
    body('password').isLength({min:5}).not().isEmpty().trim().escape().withMessage("Password should be 5 character long")
]

module.exports.loginValidation =[
    body('email').not().isEmpty().withMessage("Email is required!"),
    body("password").not().isEmpty().withMessage("Password is required")
]