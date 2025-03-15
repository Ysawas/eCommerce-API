import { Router } from 'express';
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';
import categorySchema from '../schemas/categorySchema.js';
import { schemaChecker } from '../middleware/schemaCheck.js';

const categoryRouter = Router();

categoryRouter
  .route('/')
  .get(getCategories)
  .post(schemaChecker(categorySchema), createCategory);
categoryRouter
  .route('/:id')
  .get(getCategoryById)
  .put(schemaChecker(categorySchema), updateCategory)
  .delete(deleteCategory);

export default categoryRouter;