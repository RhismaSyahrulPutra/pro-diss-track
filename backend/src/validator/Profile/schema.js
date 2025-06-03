const Joi = require('joi');

const ProfilePayloadSchema = Joi.object({
  job_title: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  profile_photo: Joi.string().allow(null, '').optional(),
});

const ProfilePhotoHeaderSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required(),
}).unknown();

module.exports = { ProfilePayloadSchema, ProfilePhotoHeaderSchema };
