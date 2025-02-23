const { body } = require("express-validator");
const prisma = require("../model/prisma");

module.exports.validateUser = [
    body('username').trim().custom(async value => {
        if (value){
            const user = await prisma.user.findUnique({
                where: {
                    username: value,
                }
            });
            if (user) {
            throw new Error('Username already exists');
            };
        } else{
            throw new Error('Username cannot be empty');
        };
    }),
    body("password").trim()
        .isLength({ min: 8}).withMessage('Password must be atleast 8 characters'),
    body('confirmpassword').trim().custom(async (value, { req }) => {
        if (!value){
            throw new Error('Confirm password field is empty');
        }
        else if (value !== req.body.password){
            throw new Error('Passwords do not match!');
        }
    }
    )
];

module.exports.validateLogin = [
    body('username').trim().custom(async value => {
        if (value){
            const user = await prisma.user.findUnique({
                where: {
                    username: value
                }
            });
            if (!user) {
            throw new Error('Username incorrect');
            };
        } else{
            throw new Error('Username cannot be empty');
        };
    }),
    body("password").trim()
        .isLength({ min: 8}).withMessage(`Password must be atleast 8 characters`)
];