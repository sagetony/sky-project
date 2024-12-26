import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Your Sequelize instance

const Nft = (sequelize) => {
  const model = sequelize.define("Nft", {
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metadataURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Assuming the default is 'active' NFT
    },
  });
  // Define the associate method outside of the define block
  model.associate = (models) => {
    model.hasMany(models.Buynft, { foreignKey: "nft_id", as: "buynft" });
  };

  return model;
};

export default Nft;
