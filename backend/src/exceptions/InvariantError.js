const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(message = 'Invariant condition failed') {
    super(message, 400);
  }
}

module.exports = InvariantError;
