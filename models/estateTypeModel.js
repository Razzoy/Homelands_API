import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";

export class estateTypeModel extends Model {}

estateTypeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    modelName: "estate_type",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true, 
  }
);

