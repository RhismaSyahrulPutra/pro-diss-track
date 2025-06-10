const InvariantError = require('../../exceptions/InvariantError');
const {
  TestimonialPostPayloadSchema,
  TestimonialPutPayloadSchema,
} = require('./schema');

const TestimonialsValidator = {
  validateTestimonialPostPayload: (payload) => {
    if (typeof payload !== 'object' || payload === null) {
      throw new InvariantError('Payload harus berupa objek');
    }

    const { error } = TestimonialPostPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateTestimonialPutPayload: (payload) => {
    if (typeof payload !== 'object' || payload === null) {
      throw new InvariantError('Payload harus berupa objek');
    }

    const { error } = TestimonialPutPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = TestimonialsValidator;
