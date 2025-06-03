const InvariantError = require('../../exceptions/InvariantError');
const { ProfilePayloadSchema, ProfilePhotoHeaderSchema } = require('./schema');

const ProfilesValidator = {
  validateProfilePayload(payload) {
    const { error } = ProfilePayloadSchema.validate(payload, {
      abortEarly: false,
    });
    if (error) {
      throw new InvariantError(`Validasi profil gagal: ${error.message}`);
    }
  },

  validateProfilePhotoHeaders(headers) {
    const normalizedHeaders = {
      'content-type': headers['content-type'] || headers['contentType'],
    };

    const { error } = ProfilePhotoHeaderSchema.validate(normalizedHeaders);
    if (error) {
      throw new InvariantError(`Validasi header foto gagal: ${error.message}`);
    }
  },
};

module.exports = ProfilesValidator;
