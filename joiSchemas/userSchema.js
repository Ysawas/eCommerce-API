import Joi from "joi";

const userSchema = Joi.object({
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
  email: Joi.string().email().required(),
});

export default userSchema;
