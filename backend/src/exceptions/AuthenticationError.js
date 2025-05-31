const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

module.exports = AuthenticationError;
