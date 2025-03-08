const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
  userId: DataTypes.INTEGER,
  total: DataTypes.DECIMAL,
});

module.exports = Order;
