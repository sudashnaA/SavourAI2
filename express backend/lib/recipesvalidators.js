const { body } = require("express-validator");

module.exports.validateGeneratedRecipe = [
    body('ingredients').trim().notEmpty().withMessage('Ingredients must not be empty'),
    body('recipetype').trim().notEmpty().withMessage('Recipe type must not be empty'),
];

module.exports.validateRecipe = [
    body('recipe').trim().notEmpty().withMessage('Recipe must not be empty'),
    body('title').trim().notEmpty().withMessage('Title must not be empty'),
]