const InvariantError = require('../../exceptions/InvariantError');
const { ProfilePayloadSchema, ProfilePhotoHeaderSchema } = require('./schema');

const ProfilesValidator = {
  validateProfilePayload(payload) {
    const { error } = ProfilePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateProfilePhotoHeaders(fileHeaders) {
    const normalizedHeaders = {
      'content-type': fileHeaders['content-type'] || fileHeaders.contentType,
    };

    const { error } = ProfilePhotoHeaderSchema.validate(normalizedHeaders);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = ProfilesValidator;
