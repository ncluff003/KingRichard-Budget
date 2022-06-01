class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Failed' : 'Error';
    this.isOperational = true;

    // THIS MAKES IT SO THIS FUNCTION CALL WILL NOT APPEAR IN THE STACKTRACE.  ALL SO AS NOT TO POLLUTE IT OR CONFUSE THE USER / DEVELOPER.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
