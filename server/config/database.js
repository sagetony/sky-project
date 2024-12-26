import { Sequelize } from "sequelize";
import config from "./config.json" with { type: "json" };
// const config = require("./config.json");
// Use the config for the 'development' environment
const { username, password, database, host, dialect } = config.development;

// Create a Sequelize instance using the imported configuration
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});

// Test the connection
try {
  await sequelize.authenticate(); // Test the connection to the database
  console.log("Database connected successfully!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize; // Export the sequelize instance to use in models
