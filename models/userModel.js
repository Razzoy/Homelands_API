import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";

export class userModel extends Model {}

userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

  },
  {
    sequelize,
    modelName: "user",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true, 
  }
);

