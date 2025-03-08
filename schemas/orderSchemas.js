const Joi = require('joi');

const orderProductSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const orderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  products: Joi.array().items(orderProductSchema).min(1).required(),
});

const updateOrderSchema = Joi.object({
  userId: Joi.number().integer(),
  products: Joi.array().items(orderProductSchema).min(1),
});

function validateOrder(req, res, next) {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateUpdateOrder(req, res, next) {
  const { error } = updateOrderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = {
  validateOrder,
  validateUpdateOrder,
};