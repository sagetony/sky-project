import db from "./models/index.js";

(async () => {
  try {
    await db.sequelize.sync({ force: true }); // Set `force: true` only in dev/test environments
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();