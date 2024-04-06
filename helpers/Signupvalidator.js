const { body } = require('express-validator')
const Signup = require('../models/Signupmodels')
//categories
exports.signupValidation = [
    body('fname')
        .notEmpty()
        .withMessage('first name must be required...'),
    body('lname')
        .notEmpty()
        .withMessage('last name must be required...'),
    body('email')
        .notEmpty()
        .withMessage('email must be required...')
        .custom(async value => {
            const existingUser = await Signup.findOne({ email: value })
            if (existingUser) {
                throw new Error('Email is already exists...')
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one digit')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character')
        .not().isIn(['password', '123456', 'qwerty'])
        .withMessage('Common passwords are not allowed'),
    body('cpassword')
        .notEmpty()
        .withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
        .withMessage('Passwords do not match')
]
exports.SignInValidation = [
    body('email')
        .notEmpty()
        .withMessage('email must be required...'),
    body('password')
        .notEmpty()
        .withMessage('password must be required...')
]
