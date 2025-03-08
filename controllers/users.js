import User from "../models/User.js";
import ExtendedError from "../errorManagement/ExtendedError.js";

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req, res) => {
  const email = req.body.email;
  const found = await User.findOne({ where: { email } });
  if (found)
    throw new ExtendedError(400, "User with that email already exists");
  const user = await User.create(req.body);
  res.json(user);
};

export const getUserById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByPk(id, { include: User });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const {
    body: { firstName, lastName, email },
    params: { id },
  } = req;
  if (!firstName || !lastName || !email)
    throw new Error(400, "firstName, lastName, and email are required");
  const user = await User.findByPk(id);
  if (!user) throw new Error(404, "User not found");
  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByPk(id);
  if (!user) throw new Error(404, "User not found");
  await user.destroy();
  res.json({ message: "User deleted" });
};
