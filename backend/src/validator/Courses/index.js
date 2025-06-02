const InvariantError = require('../../exceptions/InvariantError');
const { CoursePayloadSchema } = require('./schema');

const CoursesValidator = {
  validateCoursePayload: (payload) => {
    const validationResult = CoursePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CoursesValidator;
