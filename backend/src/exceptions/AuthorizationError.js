const ClientError = require('./ClientError');

class AuthorizationError extends ClientError {
  constructor(message = 'You are not authorized to access this resource') {
    super(message, 403);
  }
}

module.exports = AuthorizationError;
