const { body } = require("express-validator");

module.exports.validateCollection = [
    body('title').trim().notEmpty().withMessage('Title must not be empty'),
];
