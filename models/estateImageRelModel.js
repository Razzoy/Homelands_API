import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from "sequelize";

export class estateImageRelModel extends Model {}

estateImageRelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    payout: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    gross: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    net: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    num_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    num_floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    floor_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ground_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    basement_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year_of_construction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year_rebuilt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    floorplan: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    num_clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    energy_label_id: {
      type: DataTypes.INTEGER,
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
