const bcrypt = require('bcryptjs');
const prisma = require("../model/prisma");
const utils = require('../lib/jwt');
const expressAsyncHandler = require('express-async-handler');

const { CustomBadRequestError } = require("../errors/errors");
const { validateLogin, validateUser } = require("../lib/accountsvalidators.js");
const { checkValidators } = require("../lib/utils.js");

module.exports.loginUser = [validateLogin, checkValidators, expressAsyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })

    if (!user){
        throw new Error("Error validating login");
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid){
        throw new CustomBadRequestError("Password is incorrect");
    } else {
        const jwt = utils.issueJWT(user);
        delete user.password;

        res.status(200).json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
        })
    }
})];

module.exports.registerUser = [validateUser, checkValidators, expressAsyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hashedPassword,
        },
    })

    if (!newUser){
        throw new Error("Error creating user");
    }

    res.status(200).json({
        success: true,
        user: newUser,
    })
})];

