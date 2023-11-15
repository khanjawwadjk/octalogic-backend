module.exports = function errorResponse(res, statusCode, message, methodName) {
    res.status(statusCode).send({
      status: false,
      // methodName: methodName,
      message: message,
    });
  }