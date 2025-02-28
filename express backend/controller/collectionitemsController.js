const prisma = require("../model/prisma.js");
const passport = require('passport');
const expressAsyncHandler = require('express-async-handler');
const { CustomNotFoundError } = require("../errors/errors");

const { checkValidators, validateIdParam, checkIfItemExists } = require("../lib/utils.js");

const checkRecipeIdsExist = expressAsyncHandler(async (req, res, next) => {
    let validIds = await prisma.recipe.findMany({
        select: {
            id: true,
        },
        where: {
            userid: req.body.userid,
        }
    });
    validIds = validIds.map(item => item.id);
    const bodyIds = JSON.parse(req.body.recipeids)
    bodyIds.forEach(id => {
        if (!validIds.includes(id)){
            throw new CustomNotFoundError("Recipe not found")
        };
    });
    next();
});

module.exports.addCollectionItems = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), checkValidators, checkIfItemExists("collection"), checkRecipeIdsExist, expressAsyncHandler(async (req, res) => {
    const recipeIds = JSON.parse(req.body.recipeids)
    
    recipeIds.forEach(async (recipeId) => {
        const collection = await prisma.collection.update({
            where: {
                id: Number(req.params.id),
                userid: req.user.id,
            },
            data: {
                recipes: { 
                    connect: { id: recipeId},
                }
            }
        });

        if (!collection){
            throw new Error("Error adding recipes to collection");
        }
    })

    res.status(200).json({
        success: true,
        recipeIds,
    })
})];

module.exports.getCollectionItems = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), checkValidators, checkIfItemExists("collection"), expressAsyncHandler(async (req, res) => {
    const collectionItems = await prisma.collection.findUnique({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        },
        include: {
            recipes: true
        }
    });
    
    if (!collectionItems){
        throw new Error("Error retrieving collection items");
    }

    res.status(200).json({
        success: true,
        collectiontitle: collectionItems.title,
        collectionitems: collectionItems.recipes,
    })
})];


module.exports.getRecipesNotInCollection = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), checkValidators, checkIfItemExists("collection"), expressAsyncHandler(async (req, res) => {
    const collectionTitle = await prisma.collection.findUnique({
        select: {
            title: true,
        },
        where : {
            id: Number(req.params.id),
        }
    })
    
    const recipesNotInCollection = await prisma.recipe.findMany({
        where: {
            userid: req.user.id,
            collections: {
                every: {
                    id: { not: Number(req.params.id) },
                    userid: req.user.id,
                }
            }
        }
    })
    
    if (!recipesNotInCollection || !collectionTitle){
        throw new Error("Error retrieving items");
    }

    res.status(200).json({
        success: true,
        title: collectionTitle.title,
        recipes: recipesNotInCollection,
    })
})];

module.exports.removeManyCollectionItems = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), checkValidators, checkIfItemExists("collection"), expressAsyncHandler(async (req, res) => {
    const recipeIds = JSON.parse(req.body.recipeids);

    recipeIds.forEach(async (recipeId) => {
        const collection = await prisma.collection.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                recipes: {
                    disconnect: { id: recipeId },
                }
            }
        })

        if (!collection){
            throw new Error("Error removing recipes from collection");
        }
    });

    res.status(200).json({
        success: true,
        recipeIds,
    })
})];