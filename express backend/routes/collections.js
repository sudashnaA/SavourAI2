const router = require('express').Router();   
const controller = require('../controller/collectionsController');

router.post('/', controller.createCollection);
router.get('/', controller.getCollections);
router.delete('/:id', controller.deleteCollection);
router.put('/:id', controller.editCollection);
router.delete('/many/:ids', controller.deleteManyCollections);

module.exports = router;