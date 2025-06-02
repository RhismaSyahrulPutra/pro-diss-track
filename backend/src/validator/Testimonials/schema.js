const Joi = require('joi');

const TestimonialPayloadSchema = Joi.object({
  testimonial_text: Joi.string().required(),
});

module.exports = { TestimonialPayloadSchema };
