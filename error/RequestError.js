class RequestError extends Error{
    constructor(status, message) {
        super(); // вызов родительского конструктора
        this.status = status;
        this.message = message;
    }

    static badRequest() {
        return new RequestError(400, "This request with an error.");
    }

    static forbidden(message) {
        return new RequestError(403, message);
    }

    static notFound(message) {
        return new RequestError(404, message);
    }

    static internal(message) {
        return new RequestError(500, message);
    }
}

module.exports = RequestError;