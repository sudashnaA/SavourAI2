const { check, validationResult } = require("express-validator");
const { CustomNotFoundError } = require("../errors/errors");
const prisma = require("../model/prisma");
const expressAsyncHandler = require("express-async-handler");

module.exports.checkValidators = (req, res, next) => {
    const errors = validationResult(req);
    const returnErrors = [];
    errors.array().map(error => {
        returnErrors.push(error.msg);
    })

    if (!errors.isEmpty()) {
        return res.status(400).json({
        success: false,
        errors: returnErrors,
        });
    }
    next();
}

module.exports.validateIdParam = (name) => [
    check(name).trim().notEmpty().isInt().withMessage(`${name} must be an integer`),
]

module.exports.checkIfItemExists = (type) => {
    return checkIfItemExists = expressAsyncHandler(async (req, res, next) => {
        const item = await prisma[type].findUnique({
            where: {
                id: Number(req.params.id),
                userid: req.user.id,
            }
        })

        if (!item){
            throw new CustomNotFoundError(`${type} not found`);
        }

        next();
    });
}