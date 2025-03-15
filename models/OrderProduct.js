import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const OrderProduct = sequelize.define('OrderProduct', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
});

export default OrderProduct;