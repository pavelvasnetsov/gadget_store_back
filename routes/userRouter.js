const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/auth', checkAuthMiddleware, userController.checkAuth);

module.exports = router;