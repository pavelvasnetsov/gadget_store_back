const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartContoller');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');

router.post('/', checkAuthMiddleware, cartController.add);
router.get('/', checkAuthMiddleware, cartController.getAll);
router.get('/delete/:id', checkAuthMiddleware, cartController.deleteOne);

module.exports = router;