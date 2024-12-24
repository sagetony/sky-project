// import User from "../models/user.js"; // Assuming Sequelize model for User
import path from "path";
import { models } from "../models/index.js";

// View user method
export const viewUser = async (req, res) => {
  try {
    
    const user = await models.User.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// Edit user method
export const editUser = async (req, res) => {
  try {
    // Validate the incoming data
    const validatedData = {
      name: req.body.name || null,
      username: req.body.username || null,
      description: req.body.description || null,
      website: req.body.website || null,
      about: req.body.about || null,
      discord: req.body.discord || null,
      twitter: req.body.twitter || null,
      instagram: req.body.instagram || null,
      telegram: req.body.telegram || null,
      youtube: req.body.youtube || null,
      facebook: req.body.facebook || null,
    };

    // Handle file uploads for avatar and items
    if (req.files) {
      // Handle avatar upload
      if (req.files.avatar) {
        const avatarPath = path.join("uploads", req.files.avatar[0].filename);
        validatedData.avatar = avatarPath;
      }

      // Handle item uploads (item1, item2, ..., item12)
      for (let i = 1; i <= 12; i++) {
        if (req.files[`item${i}`]) {
          const itemPath = path.join(
            "uploads",
            req.files[`item${i}`][0].filename
          );
          validatedData[`item${i}`] = itemPath;
        }
      }
    }

    // Update user in the database
    const user = await models.User.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user with validated data
    await user.update(validatedData);

    return res.status(200).json({
      message: "User updated successfully",
      data: validatedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
