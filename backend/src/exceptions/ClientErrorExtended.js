const ClientError = require('./ClientError');

class ClientErrorExtended extends ClientError {
  constructor(message, statusCode = 400, details = {}) {
    super(message, statusCode);
    this.details = details;
  }
}

module.exports = ClientErrorExtended;
