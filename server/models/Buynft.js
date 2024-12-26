import { DataTypes } from "sequelize";

// Define the Buynft model as a function that accepts the sequelize instance
const Buynft = (sequelize) => {
  const model = sequelize.define(
    "Buynft",
    {
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nft_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Nfts", // Ensure this matches your table name in the database
          key: "id",
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Ensure this matches your table name in the database
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true, // Ensure the model uses timestamps if needed
      tableName: "buynfts", // Optional: specify table name if it's different from the default
    }
  );
  model.associate = (models) => {
    model.belongsTo(models.Nft, { foreignKey: "nft_id", as: "nft" });
    model.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return model;
};

export default Buynft;
