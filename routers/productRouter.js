import express from 'express';
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/products.js';
import { schemaChecker } from '../middleware/schemaCheck.js'; // Corrected import
import {
    createProductSchema,
    updateProductSchema,
} from '../schemas/productSchemas.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', schemaChecker(createProductSchema), createProduct); // Use schemaChecker directly
router.get('/:id', getProductById);
router.put('/:id', schemaChecker(updateProductSchema), updateProduct); // Use schemaChecker directly
router.delete('/:id', deleteProduct);

export default router;