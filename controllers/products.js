const Product = require('../models/Product');
const Category = require('../models/Category'); // Import Category

const getAllProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let products;

    if (categoryId) {
      // Find products by categoryId
      products = await Product.findAll({ where: { categoryId } });
    } else {
      // Find all products
      products = await Product.findAll();
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    // Check if the category exists
    const category = await Category.findByPk(req.body.categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if a new categoryId is provided and if it exists
    if (req.body.categoryId) {
        const category = await Category.findByPk(req.body.categoryId);
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }
    }

    // Update the product
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};