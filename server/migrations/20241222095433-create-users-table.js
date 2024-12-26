"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      username: Sequelize.STRING,
      wallet: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      website: Sequelize.STRING,
      about: Sequelize.TEXT,
      description: Sequelize.TEXT,
      avatar: Sequelize.STRING,
      discord: Sequelize.STRING,
      twitter: Sequelize.STRING,
      instagram: Sequelize.STRING,
      telegram: Sequelize.STRING,
      youtube: Sequelize.STRING,
      facebook: Sequelize.STRING,
      item1: Sequelize.STRING,
      item2: Sequelize.STRING,
      item3: Sequelize.STRING,
      item4: Sequelize.STRING,
      item5: Sequelize.STRING,
      item6: Sequelize.STRING,
      item7: Sequelize.STRING,
      item8: Sequelize.STRING,
      item9: Sequelize.STRING,
      item10: Sequelize.STRING,
      item11: Sequelize.STRING,
      item12: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM("Active", "Blocked"),
        defaultValue: "Active",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
