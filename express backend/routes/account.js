const router = require('express').Router();   
const controller = require('../controller/accountsController');

router.post('/login/', controller.loginUser);
router.post('/register/', controller.registerUser);
router.get('/validate/', controller.validateUser);

module.exports = router;