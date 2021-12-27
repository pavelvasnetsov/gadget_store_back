const { Brand } = require('../models/models');
const RequestError = require('../error/RequestError');

class BrandController {
    async create(req, resp, next) {
        try {
            const { name } = req.body;

            if (!name) {
                return next(RequestError.badRequest());
            }

            let brand = await Brand.findOne({where: { name }});

            if (brand) {
                return next(RequestError.forbidden('This brand already exists'));
            }

            brand = await Brand.create({ name });
            return resp.json(brand);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async getAll(req, resp) {
        try {
            const brands = await Brand.findAll();
            return resp.json(brands);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

}

module.exports = new BrandController();