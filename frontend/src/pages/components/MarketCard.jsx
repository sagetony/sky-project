/* eslint-disable react/prop-types */
import { market, onsale, pin, gift2 } from "../../assets";
import { BlueButton } from "../../components/Button";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import SkyMateNFTContractFile from "../../../abis/SkyMateNFT.sol/SkyMateNFT.json";
import { decodeError } from "ethers-decode-error";

const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;
const SkyMateNFTContractAddress = "0xa545665CD001A272d4b99d05b2b0776462c38D03";
import axios from "axios";

const MarketCard = ({
  src,
  onSale,
  name,
  price,
  coordinates,
  image,
  tokenId,
}) => {
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const handleClick = async (event) => {
    event.preventDefault();

    if (!isConnected) {
      toast.error("User disconnected");
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
    const _amount = ethers.utils.parseUnits(price, "ether");

    // Function to get the token from sessionStorage
    const getAuthToken = () => {
      return sessionStorage.getItem("ddhcnvK2"); // Get token from sessionStorage
    };
    const token = getAuthToken(); // Retrieve the token from sessionStorage

    if (!token) {
      toast.error("Connect Wallet");
      return;
    }
    const nftBuyData = {
      tokenId: tokenId,
      owner: walletAddress,
    };

    const tokenData = {
      tokenId: tokenId,
    };
    try {
      let tx = await SkyMateNFT.buyLand(tokenId, { value: _amount });
      let receipt = await tx.wait();
      toast.error("Fdf");

      if (receipt.status === 1) {
        const response = await axios.post(
          `https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/nfts/buy`,
          nftBuyData,
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        const response2 = await axios.post(
          `https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/nfts/sold`,
          tokenData,
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        if (response.status === 200 && response2.status === 200) {
          toast.success(`Land purchased successfully`);
        } else {
          toast.success(`Error purchasing NFT, Contact Admin`);
        }
      } else {
        const { error } = decodeError(err);
        if (error == 0xe15efb2e) {
          toast.error(
            `Transaction failed: No enough ether for this transaction`
          );
        } else if (error == 0x42d7591a) {
          toast.error(`Transaction failed: Land not for sale`);
        } else if (error == 0xd34d5c13) {
          toast.error(`Transaction failed: Land doesn't exist`);
        } else {
          toast.error(`Transaction failed: ${error.error.message}`);
        }
        return;
      }
    } catch (err) {
      const { error } = decodeError(err);

      if (error == 0xe15efb2e) {
        toast.error(`Transaction failed: No enough ether for this transaction`);
      } else if (error == 0x42d7591a) {
        toast.error(`Transaction failed: Land not for sale`);
      } else if (error == 0xd34d5c13) {
        toast.error(`Transaction failed: Land doesn't exist`);
      } else {
        toast.error(`Transaction failed: No enough ether for this transaction`);

        // toast.error(`Transaction failed: ${error.error.message}`);
      }
    }
  };

  return (
    <div className="p-4 hover:shadow-2xl relative bg-card rounded-2xl hover:bg-none hover:bg-slate-100 cursor-pointer hover:text-[#2A86E0] text-white font-inter">
      <h4 className="font-bold flex items-center gap-3">
        LAND#{name}{" "}
        <span>
          <img src={image} alt="" className="w-4" />
        </span>
      </h4>
      {onSale && (
        <img src={onsale} className="a absolute w-[80px] -right-6 top-16" />
      )}
      <p className="text-[12px]">{coordinates}</p>
      <img src={market} className="my-5 w-full" alt="" />
      {/* <img src={src} alt="" className="p hover:shadow-xl cursor-pointer " /> */}
      <BlueButton
        text={`${price} ETH`}
        icon={<img src={gift2} className="w-7" />}
        position={`right`}
        outerClassName={`flex-1 font-semibold`}
        innerClassName={`text-xl`}
        onClick={handleClick}
      />
    </div>
  );
};

export default MarketCard;
