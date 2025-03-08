import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import userSchema from "../joiSchemas/userSchema.js";
import { schemaChecker } from "../middleware/schemaCheck.js";
userSchema;

const userRouter = Router();

userRouter.route("/").get(getUsers).post(schemaChecker(userSchema), createUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .put(schemaChecker(userSchema), updateUser)
  .delete(deleteUser);

export default userRouter;
