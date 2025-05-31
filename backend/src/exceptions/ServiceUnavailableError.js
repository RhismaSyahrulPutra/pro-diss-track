class ServiceUnavailableError extends Error {
  constructor(message = 'Service is currently unavailable') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 503;
  }
}

module.exports = ServiceUnavailableError;
