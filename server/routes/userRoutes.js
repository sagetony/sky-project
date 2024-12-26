import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { viewUser, editUser } from "../controllers/userController.js";

// View user (GET /view-user)
// router.get("/view-user", authenticate, viewUser);
router.get("/view-user", authenticate, viewUser);

// Edit user (POST /edit-user)
router.post(
  "/edit-user",
  authenticate,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "item1", maxCount: 1 },
    { name: "item2", maxCount: 1 },
    { name: "item3", maxCount: 1 },
    { name: "item4", maxCount: 1 },
    { name: "item5", maxCount: 1 },
    { name: "item6", maxCount: 1 },
    { name: "item7", maxCount: 1 },
    { name: "item8", maxCount: 1 },
    { name: "item9", maxCount: 1 },
    { name: "item10", maxCount: 1 },
    { name: "item11", maxCount: 1 },
    { name: "item12", maxCount: 1 },
  ]),
  editUser
);

export default router;
