import errorHandler from "./errorHandling.js";
import userSchema from "../schemas/userSchema.js";
import categorySchema from "../schemas/categorySchema.js";

export const userBody = async (req, res, next) => {
  const {
    body: { firstName, lastName, email },
  } = req;
  try {
    const value = await userSchema.validateAsync({
      firstName,
      lastName,
      email,
    });
    next();
  } catch (err) {
    next(new errorHandler(400, err.message));
  }
};

export const categoryBody = async (req, res, next) => {
  const {
    body: { name },
  } = req;
  try {
    const value = await categorySchema.validateAsync({
      name,
    });
    next();
  } catch (err) {
    next(new errorHandler(400, err.message));
  }
};

export const schemaChecker = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(new errorHandler(400, err.message));
  }
};
