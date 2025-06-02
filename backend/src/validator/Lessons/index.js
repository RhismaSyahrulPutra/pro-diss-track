const InvariantError = require('../../exceptions/InvariantError');
const { LessonPayloadSchema } = require('./schema');

const LessonsValidator = {
  validateLessonPayload: (payload) => {
    const validationResult = LessonPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = LessonsValidator;
