import Category from "../models/Category";
import ExtendedError from "../errorManagement/ExtendedError";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const name = req.body.name;
  const found = await Category.findOne({ where: { name } });
  if (found)
    throw new ExtendedError(400, "Category with that name already exists");
  const category = await Category.create(req.body);
  res.json(category);
};

export const getCategoryById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id, { include: Category });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const {
    body: { name },
    params: { id },
  } = req;
  if (!name) throw new Error(400, "name is required");
  const category = await Category.findByPk(id);
  if (!category) throw new Error(404, "Category not found");
  await category.update(req.body);
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id);
  if (!category) throw new Error(404, "Category not found");
  await category.destroy();
  res.json({ message: "Category deleted" });
};
