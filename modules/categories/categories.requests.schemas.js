const Joi = require('joi');

exports.categoriesSchema = Joi.object().keys({
  gender: Joi.string().max(255).optional().allow(null, ''),
  clotheCategory: Joi.string().max(255).optional().allow(null, ''),
  brand: Joi.string()
    .valid('addidas', 'nike', 'lacosta', 'polo')
    .max(255)
    .optional()
    .allow(null, ''),
  color: Joi.string().max(255).optional().allow(null, ''),
  occassion: Joi.string().max(255).optional().allow(null, ''),
  materials: Joi.string().max(255).optional().allow(null, ''),
  // name: Joi.string().min(1).max(40).valid().required(),
  // price: Joi.number().integer().valid().required(),
  // discountedPrice: Joi.number().integer().allow(null, ''),
  // discountedPercent: Joi.number().integer().allow(null, ''),
  // photo: Joi.string().max(255).optional().allow(null, ''),
});
