class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
