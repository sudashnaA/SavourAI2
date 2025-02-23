const router = require('express').Router({mergeParams: true});   
const controller = require('../controller/collectionitemsController');

router.get('/collectionitems/', controller.getCollectionItems);
router.post('/collectionitems/', controller.addCollectionItems);
router.put('/collectionitems/', controller.removeManyCollectionItems);
router.get('/recipesnotin/', controller.getRecipesNotInCollection);

module.exports = router;