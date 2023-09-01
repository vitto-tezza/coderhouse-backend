
export default class CustomError extends Error {
    constructor(err, detail = '') {
        super(err.msg);
        this.statusCode = err.code;
        this.customError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}