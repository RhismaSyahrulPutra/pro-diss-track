const Joi = require('joi');

const LessonPayloadSchema = Joi.object({
  lesson_photo: Joi.string().uri().allow(null, ''),
  lesson_title: Joi.string().required(),
  lesson_desc: Joi.string().required(),
  lesson_content: Joi.string().required(),
  course_id: Joi.string().required(),
});

module.exports = { LessonPayloadSchema };
