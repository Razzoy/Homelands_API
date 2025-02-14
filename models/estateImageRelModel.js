import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";
import { estateModel } from "./estateModel.js";
import { imageModel } from "./imageModel.js";

export class estateImageRelModel extends Model {}

estateImageRelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: estateModel,
        key: "id",
      },
    },

    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: imageModel,
        key: "id",
      },
    },

    is_main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "estate_image_rel",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true,
  }
);
