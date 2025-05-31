const ClientError = require('./ClientError');

class BadRequestError extends ClientError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

module.exports = BadRequestError;
