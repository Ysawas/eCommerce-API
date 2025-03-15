import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().min(3).max(50).required(),
});

export default categorySchema;