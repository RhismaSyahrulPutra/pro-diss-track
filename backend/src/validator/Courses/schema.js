const Joi = require('joi');

const CoursePayloadSchema = Joi.object({
  course_photo: Joi.string().allow(null, '').optional(),
  course_title: Joi.string().required(),
  course_desc: Joi.string().required(),
});

module.exports = { CoursePayloadSchema };
