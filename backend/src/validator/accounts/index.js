const InvariantError = require('../../exceptions/InvariantError');
const { AccountPayloadSchema, PasswordPayloadSchema } = require('./schema');

const AccountsValidator = {
  validateAccountPayload: (payload) => {
    const validationResult = AccountPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePasswordPayload: (payload) => {
    const validationResult = PasswordPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AccountsValidator;
