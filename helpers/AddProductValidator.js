const { body } = require('express-validator')
//categories
exports.AddProductValidation = [
    body('categories')
        .notEmpty()
        .withMessage('Categoires must be selected...'),
    body('itemname')
        .notEmpty()
        .withMessage('Item name must be required...'),
    body('desc')
        .notEmpty()
        .withMessage('Description must be required...'),
    body('price')
        .notEmpty()
        .withMessage('Price must be required...'),
    body('qty')
        .notEmpty()
        .withMessage('Quantity must be required...'),
]
exports.UpdateProductValidation = [
    body('categories')
    .notEmpty()
    .withMessage('Categoires must be selected...'),
body('itemname')
    .notEmpty()
    .withMessage('Item name must be required...'),
body('desc')
    .notEmpty()
    .withMessage('Description must be required...'),
body('price')
    .notEmpty()
    .withMessage('Price must be required...'),
body('qty')
    .notEmpty()
    .withMessage('Quantity must be required...'),
]