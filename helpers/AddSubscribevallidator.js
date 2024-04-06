const subscribe = require('../models/AddSubscribemodels')
const { body } = require('express-validator')
//categories
exports.AddSubscribeValidation = [
    body('email')
        .notEmpty().withMessage('Email is required...')
        .custom(async value => {
            const existingUser = await subscribe.findOne({ email: value });
            if (existingUser) {
                throw new Error('Your Email is alread Subscribed...');
            }
            return true;
        }),
]
