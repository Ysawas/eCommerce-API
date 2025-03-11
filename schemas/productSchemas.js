const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  categoryId: Joi.number().integer().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().precision(2),
  categoryId: Joi.number().integer(),
});

module.exports = { createProductSchema, updateProductSchema };
