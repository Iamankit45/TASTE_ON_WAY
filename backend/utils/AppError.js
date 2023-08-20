class appError extends Error {
    constructor(message, statusCode){
        // We call parent constructor 
        // It only takes message parameter
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = appError;
