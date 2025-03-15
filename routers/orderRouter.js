import express from 'express';
import {getAllOrders,
        createOrder,
        getOrderById,
        updateOrder,
        deleteOrder,
} from '../controllers/orders.js';
import { validateOrder, validateUpdateOrder } from '../schemas/orderSchemas.js';
const router = express.Router();

// GET /orders
router.get('/', getAllOrders);

// GET /orders/:id
router.get('/:id', getOrderById);

// POST /orders
router.post('/', validateOrder, createOrder);

// PUT /orders/:id
router.put('/:id', validateUpdateOrder, updateOrder);

// DELETE /orders/:id
router.delete('/:id', deleteOrder);

export default router;