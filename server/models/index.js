import Sequelize from "sequelize";
import config from "../config/config.json" with { type: "json" };
import User from "./user.js";
import Nft from "./Nft.js";
import Buynft from "./Buynft.js";

const env = process.env.NODE_ENV || "development";
const configdb = config[env];
const sequelize = new Sequelize(
  configdb.database,
  configdb.username,
  configdb.password,
  configdb
);

// Instantiate models by passing the sequelize instance to them
const models = {
  User: User(sequelize), // Pass sequelize instance to User model
  Nft: Nft(sequelize), // Pass sequelize instance to Nft model
  Buynft: Buynft(sequelize), // Pass sequelize instance to Buynft model
};
// Initialize associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models); // Set up model associations
  }
});

// sequelize.sync({ force: false })  // `force: false` means it won't drop the tables
//   .then(() => {
//     console.log('Database synchronized!');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing the database:', error);
//   });
 
export { sequelize, Sequelize, models };
