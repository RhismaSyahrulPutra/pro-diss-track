const Joi = require('joi');

const AccountPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Minimal 6 karakter untuk contoh
  username: Joi.string().required(),
  last_login: Joi.date().iso().optional().allow(null),
  created_at: Joi.date().iso().required(),
});

module.exports = { AccountPayloadSchema };
