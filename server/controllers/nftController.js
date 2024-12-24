// import Buynft from "../models/Buynft.js";
// import Nft from "../models/Nft.js";
// import User from "../models/user.js";
import { models } from "../models/index.js";

const uploadNFT = async (req, res) => {
  try {
    const {
      tokenId,
      owner,
      description,
      image,
      name,
      price,
      metadataURL,
      coordinates,
    } = req.body;

    if (
      !tokenId ||
      !owner ||
      !description ||
      !image ||
      !name ||
      !price ||
      !metadataURL ||
      !coordinates
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await models.Nft.create({
      tokenId,
      owner,
      description,
      image,
      name,
      price,
      metadataURL,
      coordinates,
    });
    return res.status(200).json({ message: "NFT uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const loadNFT = async (req, res) => {
  try {
    const nfts = await models.Nft.findAll({
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    const totalNfts = await models.Nft.count();
    return res.status(200).json({
      nfts,
      totalNfts,
      pagination: {
        current_page: 1, // Modify pagination as per your logic
        last_page: Math.ceil(totalNfts / 20),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const buyNFT = async (req, res) => {
  try {
    const { tokenId, owner } = req.body;
    if (!tokenId || !owner) {
      return res
        .status(400)
        .json({ message: "TokenId and owner are required" });
    }

    const nft = await models.Nft.findOne({ where: { tokenId } });
    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }

    const user = req.user; // Assuming user is attached to the request (after authentication)

    await models.Buynft.create({ owner, nft_id: nft.id, user_id: user.id });

    const boughtNfts = await models.Buynft.findAll({
      include: [
        { model: models.Nft, as: "nft" },
        { model: models.User, as: "user" },
      ],
    });

    return res.status(200).json({ status: "success", nft: boughtNfts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const loadBoughtNFT = async (req, res) => {
  try {
    const boughtNfts = await models.Buynft.findAll({
      include: [
        { model: models.Nft, as: "nft" },
        { model: models.User, as: "user" },
      ],
    });
    return res.status(200).json({ nfts: boughtNfts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Export as default
export default { uploadNFT, loadNFT, buyNFT, loadBoughtNFT };
