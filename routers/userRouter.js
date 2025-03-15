import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/users.js';
import userSchema from '../schemas/userSchema.js';
import { schemaChecker } from '../middleware/schemaCheck.js';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(schemaChecker(userSchema), createUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(schemaChecker(userSchema), updateUser)
  .delete(deleteUser);

export default userRouter;