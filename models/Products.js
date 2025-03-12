const { DataTypes } = require('sequelize');
const sequelize = require('../db/index'); // Adjust path if needed
const Category = require('./Category'); // Import Category for association

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false, // Added allowNull
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Use DECIMAL for precision
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure categoryId is provided
    references: { //Explicitly define the foreign key relationship
        model: 'Categories',
        key: 'id'
    }
  },
}, {
    timestamps: true
});

// Define the association: A Product belongs to a Category
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, {foreignKey: 'categoryId'});

module.exports = Product;