import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

export class reviewModel extends Model {}

reviewModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    num_stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    estate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

  },
  {
    sequelize,
    modelName: "review",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true, 
  }
);

