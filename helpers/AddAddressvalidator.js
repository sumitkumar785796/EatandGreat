const Address = require('../models/AddAddressmodels')
const { body } = require('express-validator')
//categories
exports.AddAddressValidation = [
    body('fname')
        .notEmpty()
        .withMessage('Name is required...'),
    body('mobile')
        .notEmpty().withMessage('Mobile is required...')
        .isMobilePhone()
        .withMessage('Invalid mobile phone number...')
        .isLength({ min: 10 })
        .withMessage('Mobile number must be at least 10 digits')
        .custom(async value => {
            const existingUser = await Address.findOne({ mobile: value });
            if (existingUser) {
                throw new Error('Mobile number already exists...');
            }
            return true;
        }),
    body('pincode')
        .notEmpty()
        .withMessage('Pincode is required...'),
    body('locality')
        .notEmpty()
        .withMessage('Locality is required...'),
    body('address')
        .notEmpty()
        .withMessage('Locality is required...'),
    body('city')
        .notEmpty()
        .withMessage('City is required...'),
    body('state')
        .notEmpty()
        .withMessage('State is required...'),
]
exports.UpdateCategoriesValidation = [
    body('cname')
        .notEmpty()
        .withMessage('Categoires is required...'),
]