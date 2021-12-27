const Router = require('express');
const router = new Router();
const gadgetController = require('../controllers/gadgetController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), gadgetController.create);
router.get('/', gadgetController.getAll);
router.get('/:id', gadgetController.getOne);

module.exports = router;