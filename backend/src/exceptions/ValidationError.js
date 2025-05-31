const ClientError = require('./ClientError');

class ValidationError extends ClientError {
  constructor(message = 'Validation failed', details = {}) {
    super(message, 422);
    this.details = details;
  }
}

module.exports = ValidationError;
