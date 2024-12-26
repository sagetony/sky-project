import { DataTypes } from "sequelize"; // No need to import Sequelize directly here

// Define the User model as a function that accepts sequelize and DataTypes
const User = (sequelize) => {
  const model = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      wallet: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      discord: {
        type: DataTypes.STRING,
      },
      twitter: {
        type: DataTypes.STRING,
      },
      instagram: {
        type: DataTypes.STRING,
      },
      telegram: {
        type: DataTypes.STRING,
      },
      youtube: {
        type: DataTypes.STRING,
      },
      facebook: {
        type: DataTypes.STRING,
      },
      item1: {
        type: DataTypes.STRING,
      },
      item2: {
        type: DataTypes.STRING,
      },
      item3: {
        type: DataTypes.STRING,
      },
      item4: {
        type: DataTypes.STRING,
      },
      item5: {
        type: DataTypes.STRING,
      },
      item6: {
        type: DataTypes.STRING,
      },
      item7: {
        type: DataTypes.STRING,
      },
      item8: {
        type: DataTypes.STRING,
      },
      item9: {
        type: DataTypes.STRING,
      },
      item10: {
        type: DataTypes.STRING,
      },
      item11: {
        type: DataTypes.STRING,
      },
      item12: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("Active", "Blocked"),
        defaultValue: "Active",
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  // Define the associate method outside of the define block
  model.associate = (models) => {
    model.hasMany(models.Buynft, { foreignKey: "user_id", as: "buynft" });
  };

  return model;
};

export default User;
