const Joi = require('joi');

const AccountPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  last_login: Joi.date().iso().optional().allow(null),
  created_at: Joi.date().iso().required(),
});

const PasswordPayloadSchema = Joi.object({
  username: Joi.string().optional(),
  newPassword: Joi.string().min(6).optional(),
  currentPassword: Joi.when('newPassword', {
    is: Joi.exist(),
    then: Joi.string().min(6).required(),
    otherwise: Joi.string().optional(),
  }),
}).or('username', 'newPassword');

module.exports = { AccountPayloadSchema, PasswordPayloadSchema };
