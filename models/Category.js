import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

// Sync database
sequelize.sync();

export default Category;
