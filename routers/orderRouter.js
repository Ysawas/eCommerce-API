const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');
const { validateOrder, validateUpdateOrder } = require('../schemas/orderSchemas');

// GET /orders
router.get('/', orderController.getAllOrders);

// GET /orders/:id
router.get('/:id', orderController.getOrderById);

// POST /orders
router.post('/', validateOrder, orderController.createOrder);

// PUT /orders/:id
router.put('/:id', validateUpdateOrder, orderController.updateOrder);

// DELETE /orders/:id
router.delete('/:id', orderController.deleteOrder);

module.exports = router;