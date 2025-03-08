const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

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

module.exports = OrderProduct;
