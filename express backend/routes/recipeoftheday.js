const router = require('express').Router();   
const controller = require('../controller/recipeOfTheDayController');

router.get('/generate', controller.generateRecipeOfTheDay);
router.get('/', controller.getRecipeOfTheDay);

module.exports = router;