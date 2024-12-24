import jwt from "jsonwebtoken";
// const secretKey = process.env.JWT_SECRET_KEY; // Use an environment variable for secret key
const secretKey = "9BvT6$z9s*QnH4pX@w5ZrJkV2e!Jm0";

// Middleware to authenticate the user
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default authenticate; // Default export
