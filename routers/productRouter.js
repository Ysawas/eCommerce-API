const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const validate = require('../middleware/validation'); // Import the validation middleware
const { createProductSchema, updateProductSchema } = require('../schemas/productSchemas');

router.get('/', productController.getAllProducts);
router.post('/', validate(createProductSchema), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;