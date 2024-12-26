/* eslint-disable react/prop-types */
import { market, onsale, pin, gift2 } from "../../assets";
import { BlueButton } from "../../components/Button";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import SkyMateNFTContractFile from "../../../abis/SkyMateNFT.sol/SkyMateNFT.json";

const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;
const SkyMateNFTContractAddress = "0x9C43553EAC670f8B200c264343f5345C98219D08";
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
    if (isConnected) {
      try {
        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );
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

        let tx = await SkyMateNFT.buyLand(tokenId, { value: _amount });
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          try {
            const response = await axios.post(
              `https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/buy`,
              nftBuyData,
              {
                headers: {
                  "Content-Type": "application/json", // Set the content type to JSON
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
              }
            );
            if (response.status === 200) {
              toast.success(`Land purchased successfully`);
            } else {
              toast.success(`Error purchasing NFT, Contact Admin`);
            }
          } catch (error) {
            toast.success(`Error purchasing NFT, Contact Admin`);
          }
        } else {
          toast.error(`Transaction failed: ${error.error}`);
          return;
        }
      } catch (error) {
        toast.error(`Transaction failed: ${error.error}`);
      }
    } else {
      toast.error(`Connect Wallet`);
      return;
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
