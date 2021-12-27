const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, resp, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];//Получение самого токена из заголовка, под индексом 0 тип токена

            if (!token) {
                return resp.status(401).json({message: "The user is not logged in."});
            }

            const decode = jwt.verify(token, process.env.JWT_KEY);

            if (decode.role !== role) {
                return resp.status(403).json({message: "No access."})
            }
            req.user = decode;
            next();
        } catch (err) {
            resp.status(401).json({message: "The user is not logged in."})
        }
    };
}