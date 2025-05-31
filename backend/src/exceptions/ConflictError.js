const ClientError = require('./ClientError');

class ConflictError extends ClientError {
  constructor(message = 'Conflict occurred') {
    super(message, 409);
  }
}

module.exports = ConflictError;
