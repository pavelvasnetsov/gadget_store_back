const { Category } = require('../models/models');
const RequestError = require('../error/RequestError');

class CategoryController {
    async create(req, resp, next) {
        try {
            const { name } = req.body;

            if (!name) {
                return next(RequestError.badRequest());
            }

            let category = await Category.findOne({where: { name }});

            if (category) {
                return next(RequestError.forbidden('This category already exists'));
            }

            category = await Category.create({ name });
            return resp.json(category);

        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async getAll(req, resp) {
        try {
            const categorys = await Category.findAll();
            return resp.json(categorys);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

}

module.exports = new CategoryController();