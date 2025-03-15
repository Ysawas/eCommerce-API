import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: DataTypes.INTEGER,
  total: DataTypes.DECIMAL,
});

export default Order;