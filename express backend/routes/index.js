const router = require('express').Router();

router.use('/api/account/', require('./account'));
router.use('/api/recipes/', require('./recipes'));
router.use('/api/collections/', require('./collections'));
router.use('/api/collections/:id/', require('./collectionitems'));
router.use('/api/recipeoftheday/', require('./recipeoftheday'));

module.exports = router;
