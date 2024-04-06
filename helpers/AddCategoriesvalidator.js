const { body } = require('express-validator')
//categories
exports.AddCategoriesValidation = [
    body('cname')
        .notEmpty()
        .withMessage('Categoires is required...'),
]
exports.UpdateCategoriesValidation = [
    body('cname')
        .notEmpty()
        .withMessage('Categoires is required...'),
]