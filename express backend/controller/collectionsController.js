const prisma = require("../model/prisma");
const passport = require('passport');
const expressAsyncHandler = require('express-async-handler');

const { CustomBadRequestError, CustomNotFoundError } = require("../errors/errors");
const { validateCollection } = require("../lib/collectionsvalidators.js");
const { checkValidators, validateIdParam, checkIfItemExists } = require("../lib/utils.js");

module.exports.createCollection = [passport.authenticate('jwt', { session: false }), validateCollection, checkValidators, expressAsyncHandler(async (req, res) => {
    const collection = await prisma.collection.create({
        data: {
            userid: req.user.id,
            title: req.body.title,
        }
    })

    if (!collection){
        throw new Error("Error creating collection");
    }

    res.status(200).json({
        success: true,
        collection,
    })
})];

module.exports.getCollections = [passport.authenticate('jwt', { session: false }), expressAsyncHandler(async (req, res) => {
    const collections = await prisma.collection.findMany({
        where: {
            userid: req.user.id,
        }
    })

    if (!collections){
        throw new Error("Error finding collection");
    }

    res.status(200).json({
        success: true,
        collections,
    })
})];

module.exports.deleteCollection = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), 
    checkValidators, checkIfItemExists("collection"), expressAsyncHandler(async (req, res) => {
    const collection = await prisma.collection.delete({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        }
    })

    if (!collection){
        throw new Error("Error deleting collection");
    }

    res.status(200).json({
        success: true,
        collection,
    })
})];


module.exports.deleteManyCollections = [passport.authenticate('jwt', { session: false }), expressAsyncHandler(async (req, res) => {
    const idsToBeDeleted = JSON.parse(req.params.ids);
    const collections = await prisma.collection.deleteMany({
        where: {
            id: {
                in: idsToBeDeleted,
            }
        }
    })

    if (!collections){
        throw new Error("Error deleting collections");
    }

    res.status(200).json({
        success: true,
        collections,
    })
})];

module.exports.editCollection = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), validateCollection,
    checkValidators, checkIfItemExists("collection"), expressAsyncHandler(async (req, res) => {
    const collection = await prisma.collection.update({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        }, 
        data: {
            title: req.body.title,
        }
    })

    if (!collection){
        throw new Error("Error updating collection");
    }

    res.status(200).json({
        success: true,
        collection,
    })
})];