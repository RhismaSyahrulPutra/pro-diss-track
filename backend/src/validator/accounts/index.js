const InvariantError = require('../../exceptions/InvariantError');
const { AccountPayloadSchema } = require('./schema');

const AccountsValidator = {
  validateAccountPayload: (payload) => {
    const validationResult = AccountPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AccountsValidator;
