const uuid = require('uuid'); // Пакет для генерации случайных ID
const path = require('path');
const { Gadget, GadgetProperty } = require('../models/models.js');
const RequestError = require('../error/RequestError');

class GadgetController {
    
    async create(req, resp, next) {
        try {
            let {name, price, brandId, categoryId, properties} = req.body;

            if (!name || !price || !brandId || !categoryId) {
                next(RequestError.badRequest());
            }
            
            let gadget = await Gadget.findOne({where: {name}});

            if (gadget) {
                return next(RequestError.forbidden('This gadget already exists'));
            }

            const { img } = req.files;

            if (!img) {
                next(RequestError.badRequest());
            }

            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            gadget = await Gadget.create({
                name,
                price,
                brandId,
                categoryId,
                img: fileName
            });

            if (properties) {
                properties = JSON.parse(properties);
                properties.forEach(opt =>
                    GadgetProperty.create({ // Создает свойства
                        title: opt.title,
                        description: opt.description,
                        gadgetId: gadget.id
                    })
                );
            }

            return resp.json(gadget);
        } catch (err) {
            next(RequestError.internal(err.message));
        }

    }

    async getAll(req, resp) {
        try {
            let {brandId, categoryId, limit, page} = req.query;

            page = page || 1;
            limit = limit || 10;

            let offset = page * limit - limit;

            let gadgets;

            if (!brandId && !categoryId) {
                gadgets = await Gadget.findAndCountAll({limit, offset});
            }
            if (brandId && !categoryId) {
                gadgets = await Gadget.findAndCountAll({where:{brandId}, limit, offset});
            }
            if (!brandId && categoryId) {
                gadgets = await Gadget.findAndCountAll({where:{categoryId}, limit, offset});
            }
            if (brandId && categoryId) {
                gadgets = await Gadget.findAndCountAll({where:{categoryId, brandId}, limit, offset});
            }
            return resp.json(gadgets);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    
    }

    async getOne(req, resp) {
        try {
            const { id } = req.params;
            const gadget = await Gadget.findOne(
                {
                    where: { id },
                    include: [{ model: GadgetProperty, as: 'property' }]
                },
            );

            return resp.json(gadget);
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }
}

module.exports = new GadgetController();