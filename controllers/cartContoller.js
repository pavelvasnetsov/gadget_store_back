const { Cart, CartGadget } = require("../models/models.js");
const RequestError = require('../error/RequestError');

class CartController {
    async add(req, resp, next) {
        try {
            const { gadgetId } = req.body;
            
            if (!gadgetId) {
                next(RequestError.badRequest());
            }

            const userId = req.user.id;

            if (!gadgetId) {
                return next(RequestError.badRequest());
            }
            let cart = await Cart.findOne({where: { userId }});
            let cartId = cart.id;

            let cartItem = await CartGadget.findOne({where: { gadgetId, cartId }});

            if (cartItem) {
                return next(RequestError.forbidden('This product is already in the cart.'));
            }

            cartItem = await CartGadget.create({ gadgetId, cartId });

            return resp.json(cartItem);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async getAll(req, resp, next) {
        try {
            let { limit, page } = req.query;

            const userId = req.user.id;

            page = page || 1;
            limit = limit || 10;

            let offset = page * limit - limit;

            let cart = await Cart.findOne({where: { userId }});

            cart = await CartGadget.findAndCountAll({where: { cartId: cart.id }, limit, offset});

            return resp.json(cart);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async deleteOne(req, resp, next) {
        try {
            let { id } = req.params;
            await CartGadget.destroy({where: { id }});
            return resp.json({message: "deleted"});
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }
}

module.exports = new CartController();