const RequestError = require('../error/RequestError.js');

module.exports = function (err, req, resp, next) {
    if (err instanceof RequestError) { // если класс ошиби RequestError
        return resp.status(err.status).json({message: err.message}); // возвращаем на клиент статус ошибки с сообщением 
    }

    return resp.status(500).json({message: "Unexpected error!"});
};
