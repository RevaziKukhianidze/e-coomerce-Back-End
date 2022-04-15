const Joi = require('joi');

exports.userSchema = Joi.object().keys({
  name: Joi.string().min(1).max(40).valid().required(),
  surname: Joi.string().min(1).max(40).valid().required(),
  email: Joi.string().min(5).max(255).required().email(),
  role: Joi.string().optional().allow(null, ''),
  photo: Joi.string().max(255).optional().allow(null, ''),
  password: Joi.string().optional().allow(null, ''),
  passwordConfirm: Joi.string().optional().allow(null, ''),
});

// exports.accountUpdateSchema = Joi.object().keys({
//   lang: Joi.string().valid('en', 'ru', 'ge').min(2).max(2).required(),
//   industry: Joi.string().min(24).max(24).required(),
//   idNumber: Joi.string().required(),
//   size: Joi.string().min(24).max(24).required(),
//   type: Joi.string().min(24).max(24).required(),
//   zipCode: Joi.string().min(1).max(255).required(),
//   country: Joi.string().min(24).max(24).required(),
//   city: Joi.string().min(1).max(255).required(),
//   address: Joi.string().min(1).max(255).required(),
//   photo: Joi.string().max(255).optional().allow(null, ''),
//   email: Joi.string().min(5).max(255).required().email(),
//   website: Joi.string().max(255).optional().allow(null, ''),
//   phone: Joi.string().max(255).optional().allow(null, ''),
//   mainSocialMedia: Joi.string().allow('').max(255).optional().allow(null, ''),
//   description: Joi.string().max(255).optional().allow(null, ''),
// });
