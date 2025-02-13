import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";
import { estateModel } from "./estateModel.js";
import { userModel } from "./userModel.js";

export class favoriteModel extends Model {}

favoriteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: "id",
      }
    },

    estate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: estateModel,
          key: "id",
        }
      },

  },
  {
    sequelize,
    modelName: "favorite",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true, 
  }
);

