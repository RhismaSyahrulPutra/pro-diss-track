const Joi = require('joi');

const ProfilePayloadSchema = Joi.object({
  job_title: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  profile_photo: Joi.string().allow(null, '').optional(),
});

module.exports = { ProfilePayloadSchema };
