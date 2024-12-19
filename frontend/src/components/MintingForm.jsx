import { useState, useEffect } from "react";
import { Cloud1, Cloud2, Cloud3, login_bg } from "../assets";
import { BlueButton } from "./Button";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import SkyMateNFTContractFile from "../../abis/SkyMateNFT.sol/SkyMateNFT.json";

import axios from "axios";

const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;
const SkyMateNFTContractAddress = "0x2119b78F6db9091d11A5326352d725c1255a974B";
// const API_KEY = import.meta.env.VITE_NFT_STORAGE_API_KEY;
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;
const MintingForm = () => {
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [location, setLocation] = useState("");
  const [zone, setZone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tokenId, setTokenId] = useState(0);

  const uploadImageToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      setError("Error uploading image to Pinata: " + error.message);
      throw error;
    }
  };

  const uploadToPinata = async (metadata) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      setError("Error uploading to Pinata: " + error.message);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!coordinates || !location || !description || !zone || !price) {
      toast.error("All fields are required");
      return;
    }

    if (!isConnected) {
      toast.error("User disconnected");
      return;
    }
    if (price == 0) {
      toast.error("Price can't be zero");
      return;
    }

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();
    const walletAddress = await signer.getAddress();

    // // The Contract object
    const SkyMateNFT = new ethers.Contract(
      SkyMateNFTContractAddress,
      SkyMateNFTContractAbi,
      signer
    );
    const tokenIdBigNumber = await SkyMateNFT._tokenIdCounter();
    const tokenId = tokenIdBigNumber.toNumber();

    setTokenId(tokenId);
    const imageUrl = await uploadImageToPinata(imageFile);
    //metadata
    const metadata = {
      name: `${location} #${tokenId}`,
      description: description,
      image: imageUrl,
      attributes: [
        { trait_type: "Zone", value: zone },
        { trait_type: "Coordinates", value: coordinates },
        { trait_type: "Price", value: `${price} ETH` },
      ],
    };
    const tokenURI = await uploadToPinata(metadata);

    const _amount = ethers.utils.parseUnits(price, 18);
    try {
      const mintTx = await SkyMateNFT.uploadLand(
        coordinates,
        location,
        description,
        zone,
        _amount,
        tokenURI
      );
      const receipt = await mintTx.wait();

      if (receipt.status === 1) {
        const land = await SkyMateNFT.getLand(tokenId);
        const zonename = land.zoneName;
        const nftData = {
          tokenId: tokenId,
          owner: walletAddress,
          description: description,
          image: imageUrl,
          name: zonename,
          price: price,
          metadataURL: tokenURI,
          coordinates: coordinates,
        };
        // Sending the POST request to the API
        try {
          const response = await axios.post(
            "https://smcc99.com/api/uploadnft",
            nftData
          );
          if (response.status === 201) {
            toast.success("NFT is minted and saved successfully");
          } else {
            toast.error("Failed to save NFT data to backend");
          }
        } catch (error) {
          toast.error(`Error saving NFT data: ${error.message}`);
        }
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
    }
  };
  return (
    <div
      className="pt-20 bg-center relative"
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className="flex flex-col-reverse lg:min-h-[110vh] lg:mx-20 gap-16 lg:gap-20 py-10 justify-center">
        <img
          src={Cloud1}
          alt=""
          className="absolute top-20 left-0 blur-sm z-0 w-48 animate-upAndDown"
        />
        <div className="bg-login mt-14 md:w-1/2 sm:w-2/3 sm:mx-auto mx-5 rounded-[50px] text-white z-20 h-fit p-7 px-16 shadow-card">
          <div className="text-center">
            <h3 className="font-itim text-3xl mb-8">NFT Minting</h3>
            <div className="px-8">
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <input
                  type="text"
                  name="name"
                  placeholder="Location Name (Zone A)"
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocation(value);
                  }}
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] mt-5 border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />

                {/* Email Input */}
                <select
                  name="zone"
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    setZone(value);
                  }}
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                >
                  <option value="" disabled selected>
                    Select a Land Zone
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>

                {/* Wallet Address Input */}
                <input
                  type="text"
                  name="coordinates"
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    setCoordinates(value);
                  }}
                  placeholder="Coordinates (20, 40)"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />

                <input
                  type="number"
                  required
                  name="price"
                  placeholder="Land Price"
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPrice(value);
                  }}
                  step="any"
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                />
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm text-white">
                    Upload Land Image
                  </label>
                  <input
                    type="file"
                    required
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const value = e.target.files[0];
                      setImageFile(value);
                    }}
                    className="block w-full text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#44C7FF] file:text-white hover:file:bg-[#1B85ED]"
                  />
                </div>

                {/* Additional Input */}
                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDescription(value);
                  }}
                  className="block w-full mb-4 placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] border-2 rounded-md p-5 py-2 bg-[#1B85ED]"
                ></textarea>

                {/* Submit Button */}
                <BlueButton
                  // onClick={handleSubmit}
                  loadText="Getting access..."
                  text="Mint NFT"
                  outerClassName="my-6 mb-1 py-0"
                  innerClassName="py-0 text-sm"
                />
              </form>
            </div>
          </div>
        </div>
        <img
          src={Cloud2}
          alt=""
          className="absolute top-[700px] md:top-[560px] blur-sm left-0 w-52 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[480px] blur-sm top-[350px] right-0 w-52 animate-upAndDown"
        />
      </div>
    </div>
  );
};

export default MintingForm;
