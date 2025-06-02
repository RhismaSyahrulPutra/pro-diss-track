const Joi = require('joi');

const AccountPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  last_login: Joi.date().iso().optional().allow(null),
  created_at: Joi.date().iso().required(),
});

const PasswordPayloadSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports = { AccountPayloadSchema, PasswordPayloadSchema };
