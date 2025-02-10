import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

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
    },

    estate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

