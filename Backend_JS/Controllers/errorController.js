module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || `Error`;
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
