const prisma = require("../model/prisma");
const passport = require('passport');
const expressAsyncHandler = require('express-async-handler');

const { CustomBadRequestError, CustomNotFoundError } = require("../errors/errors");
const { validateGeneratedRecipe, validateRecipe } = require("../lib/recipesvalidators.js");
const { checkValidators, validateIdParam, checkIfItemExists } = require("../lib/utils.js");

const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

module.exports.generateRecipe = [passport.authenticate('jwt', { session: false }), validateGeneratedRecipe, checkValidators, expressAsyncHandler(async (req, res) => {
    let prompt = `short output ${req.body.recipetype} recipe with a title that has ingredients ${req.body.ingredients}`
    if (req.body.requests.trim().length > 0){
        prompt += ` and is ${req.body.requests}`;
    }

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
    });

    const output = chatCompletion.choices[0].message.content
    
    res.status(200).json({
        success: true,
        recipe: output,
    })
})];

module.exports.saveRecipe = [passport.authenticate('jwt', { session: false }), validateRecipe, checkValidators, expressAsyncHandler(async (req, res) => {
    const recipe = await prisma.recipe.create({
        data: {
            userid: req.user.id,
            title: req.body.title,
            recipe: req.body.recipe,
        }
    })

    if (!recipe){
        throw new Error("Error saving recipe");
    }

    res.status(200).json({
        success: true,
        recipe: recipe,
    })
})];


module.exports.getRecipes = [passport.authenticate('jwt', { session: false }), expressAsyncHandler(async (req, res) => {
    const recipes = await prisma.recipe.findMany({
        where: {
            userid: req.user.id,
        }
    })

    if (!recipes){
        throw new Error("Error retrieving recipes");
    }

    res.status(200).json({
        success: true,
        recipes,
    })
})];

module.exports.getRecipeById = [passport.authenticate('jwt', { session: false }), validateIdParam("id"),
    checkValidators, expressAsyncHandler(async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        }
    })

    if (!recipe){
        throw new CustomNotFoundError("Recipe not Found");
    }

    res.status(200).json({
        success: true,
        recipe,
    })
})];

module.exports.deleteRecipe = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), 
    checkValidators, checkIfItemExists("recipe"), expressAsyncHandler(async (req, res) => {
    const recipe = await prisma.recipe.delete({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        }
    })

    if (!recipe){
        throw new Error("Error deleting recipe");
    }

    res.status(200).json({
        success: true,
        recipe,
    })
})];

module.exports.deleteManyRecipes = [passport.authenticate('jwt', { session: false }), expressAsyncHandler(async (req, res) => {
    const idsToBeDeleted = JSON.parse(req.params.ids);
    const recipes = await prisma.recipe.deleteMany({
        where: {
            id: {
                in: idsToBeDeleted,
            }
        }
    })

    if (!recipes){
        throw new Error("Error deleting recipes");
    }

    res.status(200).json({
        success: true,
        recipes,
    })
})];

module.exports.editRecipe = [passport.authenticate('jwt', { session: false }), validateIdParam("id"), validateRecipe,
    checkValidators, checkIfItemExists("recipe"), expressAsyncHandler(async (req, res) => {
    const recipe = await prisma.recipe.update({
        where: {
            id: Number(req.params.id),
            userid: req.user.id,
        }, 
        data: {
            title: req.body.title,
            recipe: req.body.recipe,
            date: new Date(),
        }
    })

    if (!recipe){
        throw new Error("Error updating recipe");
    }

    res.status(200).json({
        success: true,
        recipe,
    })
})];