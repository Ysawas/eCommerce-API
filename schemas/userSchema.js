import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.number().integer().optional(),
  firstName: Joi.string()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .min(3)
    .max(50)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .min(3)
    .max(50)
    .required(),
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default userSchema;