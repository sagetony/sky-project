import express from "express";
const router = express.Router();
import nftController from "../controllers/nftController.js";
import authenticate from "../middlewares/authenticate.js";

// Upload NFT
router.post("/upload", authenticate, nftController.uploadNFT);

// Load NFTs
router.get("/load", nftController.loadNFT);

// Buy NFT
router.post("/buy", authenticate, nftController.buyNFT);

// Load Bought NFTs
router.get("/bought", nftController.loadBoughtNFT);

export default router;
