const prisma = require("../model/prisma");
const passport = require('passport');
const expressAsyncHandler = require('express-async-handler');
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

module.exports.generateRecipeOfTheDay = [expressAsyncHandler(async (req, res) => {
    let prompt = `short output recipe of the day with a title`;

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
    });

    const output = chatCompletion.choices[0].message.content
    
    const savedRecipe = await prisma.recipeOfTheDay.create({
        data: {
            title: (output.slice(0, output.indexOf("\n"))).replace(/[+#*\n]|^\d+/g, " ").trim(),
            recipe: output
        }
    })

    if (!savedRecipe){
        throw new Error("Error generating recipe");
    }

    res.status(200).json({
        success: true,
        recipe: savedRecipe,
    })
})];

module.exports.getRecipeOfTheDay = [passport.authenticate('jwt', { session: false }), expressAsyncHandler(async (req, res) => {
    const recipe = await prisma.recipeOfTheDay.findMany({
        orderBy: {
            id: 'desc',
        },
        take: 1 
    })

    if (!recipe){
        throw new Error("Error finding recipe of the day");
    }

    res.status(200).json({
        success: true,
        recipe: recipe[0],
    })
})];