const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const gadgetRouter = require('./gadgetRouter');
const categoryRouter = require('./categoryRouter');
const brandRouter = require('./brandRouter');
const cartRouter = require('./cartRouter');

router.use('/user', userRouter);
router.use('/gadget', gadgetRouter);
router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/cart', cartRouter);

module.exports = router;