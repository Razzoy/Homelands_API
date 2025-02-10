import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

export class estateModel extends Model {}

estateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "city",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true,
  }
);
