const Joi = require('joi');

const TestimonialPostPayloadSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  testimonial_text: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
});

const TestimonialPutPayloadSchema = Joi.object({
  testimonial_text: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
});

module.exports = { TestimonialPostPayloadSchema, TestimonialPutPayloadSchema };
