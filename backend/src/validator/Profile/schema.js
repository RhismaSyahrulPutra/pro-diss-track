const Joi = require('joi');

const ProfilePayloadSchema = Joi.object({
  job_title: Joi.string().trim().required().messages({
    'string.empty': 'Pekerjaan tidak boleh kosong',
    'any.required': 'Pekerjaan wajib diisi',
  }),
  age: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Umur harus berupa angka',
    'number.min': 'Umur tidak boleh negatif',
  }),
  about_me: Joi.string().optional().allow('', null).messages({
    'string.base': 'Tentang saya harus berupa teks',
  }),
  profile_photo: Joi.string().uri().optional().allow('', null).messages({
    'string.uri': 'URL foto tidak valid',
  }),
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
    .required()
    .messages({
      'any.only': 'Tipe file tidak diizinkan. Hanya gambar yang diizinkan',
      'any.required': 'Header content-type diperlukan',
    }),
}).unknown();

module.exports = {
  ProfilePayloadSchema,
  ProfilePhotoHeaderSchema,
};
