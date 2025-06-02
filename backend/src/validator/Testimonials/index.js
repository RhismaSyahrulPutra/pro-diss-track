const InvariantError = require('../../exceptions/InvariantError');
const { TestimonialPayloadSchema } = require('./schema');

const TestimonialsValidator = {
  validateTestimonialPayload: (payload) => {
    if (typeof payload !== 'object' || payload === null) {
      throw new InvariantError('Payload harus berupa objek');
    }

    const validationResult = TestimonialPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TestimonialsValidator;
