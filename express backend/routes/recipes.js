const router = require('express').Router();   
const controller = require('../controller/recipesController');

router.post('/generate/', controller.generateRecipe);
router.post('/', controller.saveRecipe);
router.get('/', controller.getRecipes);
router.delete('/:id', controller.deleteRecipe);
router.delete('/many/:ids', controller.deleteManyRecipes);
router.put('/:id', controller.editRecipe);
router.get('/:id', controller.getRecipeById);

module.exports = router;