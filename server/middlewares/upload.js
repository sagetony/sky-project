import multer from "multer";
import path from "path";

// Setup Multer for file uploads
const upload = multer({
  dest: "uploads/", // Temporary folder for uploaded files
  limits: { fileSize: 51200 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "video/mp4",
      "video/mov",
      "video/avi",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

export default upload;
