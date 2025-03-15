import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import OrderProduct from '../models/OrderProduct.js';
import sequelize from '../db/index.js';

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { userId, products } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let total = 0;
    for (const productInfo of products) {
      const product = await Product.findByPk(productInfo.productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${productInfo.productId} not found` });
      }
      total += product.price * productInfo.quantity;
    }

    const order = await Order.create({ userId, total }, { transaction: t });

    for (const productInfo of products) {
      await OrderProduct.create(
        {
          orderId: order.id,
          productId: productInfo.productId,
          quantity: productInfo.quantity,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { userId, products } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      order.userId = userId;
    }

    if (products) {
      let total = 0;
      await OrderProduct.destroy({ where: { orderId: order.id }, transaction: t });
      for (const productInfo of products) {
        const product = await Product.findByPk(productInfo.productId);
        if (!product) {
          return res
            .status(400)
            .json({ message: `Product with ID ${productInfo.productId} not found` });
        }
        total += product.price * productInfo.quantity;
        await OrderProduct.create(
          {
            orderId: order.id,
            productId: productInfo.productId,
            quantity: productInfo.quantity,
          },
          { transaction: t }
        );
      }
      order.total = total;
    }

    await order.save({ transaction: t });
    await t.commit();
    res.json(order);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await OrderProduct.destroy({ where: { orderId: order.id }, transaction: t });
    await order.destroy({ transaction: t });
    await t.commit();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};