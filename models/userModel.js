import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"

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
    hooks: {
      beforeCreate: async (userModel, options) => {
        userModel.password = await createHash(userModel.password);
      },
      beforeUpdate: async (userModel, options) => {
        userModel.password = await createHash(userModel.password);
      },
    },
  }
);

userModel.addHook('beforeBulkCreate', async (users) => {
  // Krypter hver adgangskode før bulkCreate-operationen
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

const createHash = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};


