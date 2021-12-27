const RequestError = require("../error/RequestError.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models/models.js');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, resp, next) {
        try {
            const { email, password, role } = req.body;
        
            if (!email || !password || !role) {
                return next(RequestError.badRequest());
            }
        
            const candidate = await User.findOne({where: { email }});

            if (candidate) {
                return next(RequestError.forbidden('User with this email already exists'));
            }

            const hashPassword = await bcrypt.hash(password, 5); // Хеширование пароля
            const user = await User.create({email, role, password: hashPassword}); // Создание пользователя

            await Cart.create({userId: user.id}); // Создание карзины данного пользователя

            const token = generateJwt(user.id, user.email, user.role);

            return resp.json({ token });

        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async login(req, resp, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(RequestError.badRequest());
            }   

            const user = await User.findOne({where: { email }});

            if (!user) {
                return next(RequestError.notFound('The user with this email was not found.'));
            }

            let comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(RequestError.notFound('Invalid password entered.'));
            }

            const token = generateJwt(user.id, user.email, user.role);
            return resp.json({ token });

        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }

    async checkAuth(req, resp) {
        try {
            const jwt = generateJwt(req.user.id, req.user.email, req.user.role);
            return resp.json({ jwt });
        } catch (err) {
            next(RequestError.internal(err.message));
        }
    }
}

module.exports = new UserController();