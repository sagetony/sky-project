import cors from "cors";
import express from "express";
import Session from "express-session";
import { generateNonce } from "siwe";
import {
  verifySignature,
  getAddressFromMessage,
  getChainIdFromMessage,
} from "@reown/appkit-siwe";
import User from "./models/user.js"; // Import the User model
import jwt from "jsonwebtoken"; // Import JWT package
import userRoutes from "./routes/userRoutes.js";
import nftRoutes from "./routes/nftRoutes.js";
import { models } from "./models/index.js";

// get env variables
import dotenv from "dotenv";
dotenv.config();

// const secretKey = process.env.JWT_SECRET_KEY;
const secretKey = "9BvT6$z9s*QnH4pX@w5ZrJkV2e!Jm0";
// get Project ID
const projectId = process.env.PROJECT_ID;
const blacklistedTokens = new Set();

const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure cors and sessions
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(
  Session({
    name: "siwe-quickstart",
    secret: "siwe-quickstart-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

// Routes
app.use("/api/nfts", nftRoutes);
app.use("/api/users", userRoutes); // All user-related routes

// generate a nonce
app.get("/nonce", function (_, res) {
  res.setHeader("Content-Type", "text/plain");
  console.log("/nonce");
  res.send(generateNonce());
});

// verify the message
app.post("/verify", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: "SiweMessage is undefined" });
    }
    const message = req.body.message;

    const address = getAddressFromMessage(message);
    let chainId = getChainIdFromMessage(message);

    const isValid = await verifySignature({
      address,
      message,
      signature: req.body.signature,
      chainId,
      projectId,
    });

    if (!isValid) {
      // throw an error if the signature is invalid
      throw new Error("Invalid signature");
    }
    if (chainId.includes(":")) {
      chainId = chainId.split(":")[1];
    }
    // Convert chainId to a number
    chainId = Number(chainId);

    if (isNaN(chainId)) {
      throw new Error("Invalid chainId");
    }

    // Check if the user exists or create a new one
    let user = await models.User.findOne({ where: { wallet: address } });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await models.User.create({
        wallet: address,
        status: "Active", // Default status for a new user
      });
    }

    // // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user.id, wallet: user.wallet }, // Payload
      secretKey // Secret key to sign the token (use an environment variable for security)
    );

    // // save the session with the address and chainId (SIWESession)
    req.session.siwe = { address, chainId };
    req.session.save(() =>
      res.status(200).json({ success: true, token: token, user: user })
    );
    // req.session.save(() => res.status(200).send(true));
  } catch (e) {
    console.error("Error during verification:", e.stack);
    // // clean the session
    req.session.siwe = null;
    req.session.nonce = null;
    req.session.save(() => res.status(500).json({ message: e.message }));
  }
});

// get the session
app.get("/session", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // console.log("/session", req.session.siwe);

  res.send(req.session.siwe);
});

// signout and clean the session
app.get("/signout", (req, res) => {
  // Optional: Add the token to a blacklist to invalidate it
  req.session.siwe = null;
  req.session.nonce = null;
  req.session.save(() => res.send({}));
});

// start the server
const listener = app.listen(8080, () =>
  console.log("Listening on port " + listener.address().port)
);
