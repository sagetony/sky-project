/* eslint-disable react/prop-types */

import { close, make_offer, Star } from "../assets";
import { BlueButton } from "../components/Button";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { decodeError } from "ethers-decode-error";

import SkyMateNFTContractFile from "../../abis/SkyMateNFT.sol/SkyMateNFT.json";

const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;
const SkyMateNFTContractAddress = "0xa545665CD001A272d4b99d05b2b0776462c38D03";
import axios from "axios";

const LandModal = ({ user, onclose }) => {
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

        const _amount = ethers.utils.parseUnits(user?.nft.price, "ether");

        // Function to get the token from sessionStorage
        const getAuthToken = () => {
          return sessionStorage.getItem("ddhcnvK2"); // Get token from sessionStorage
        };

        const token = getAuthToken(); // Retrieve the token from sessionStorage

        if (!token) {
          toast.error("Connect Wallet");
          return;
        }

        const tokenId = user?.nft.tokenId;

        const nftBuyData = {
          tokenId: tokenId,
          owner: walletAddress,
        };

        const tokenData = {
          tokenId: tokenId,
        };
        toast.error("Connect Wallet");
        return;
        let tx = await SkyMateNFT.buyLand(tokenId, { value: _amount });
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          try {
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
    <div className="fixed  backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[9999] top-0 left-0">
      <div className=" md:max-h-[620px]  [scrollbar-width:none] [--ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[600px] overflow-auto text-white rounded-3xl  w-full lg:w-2/5 md:w-3/4">
        <div className="bg-login font-inter p-8">
          <div className="flex justify-end">
            <img
              src={close}
              onClick={onclose}
              className=" cursor-pointer w-10 hover:opacity-50 "
            />
          </div>

          <h3 className="text-4xl">
            #{user?.nft?.name} {user?.nft?.size}
          </h3>
          <div className="w-2/3 flex items-center justify-center mx-auto my-10">
            <img src={user?.nft?.image} alt="" className="w-full" />
          </div>
          <div className="grid text-center lg:grid-cols-3">
            <div>
              <h4 className="font-bold text-xl">BLOCKCHAIN</h4>
              <p>Ethereum</p>
            </div>
            <div>
              {/* <h4 className="font-bold text-xl">SIZE</h4>
              <p>1 x 1</p> */}
            </div>
            <div>
              <h4 className="font-bold text-xl">TOKEN ID</h4>
              <p>{user?.nft?.tokenId}</p>
            </div>
          </div>

          <div className=" my-10 cursor-pointer hover:scale-110 ease-linear mx-auto w-2/4">
            {/* <img src={make_offer} alt="" /> */}
            <BlueButton
              text={"Make Offer"}
              // icon={<img src={gift2} className="w-7" />}
              position={`right`}
              outerClassName={`flex-1 font-semibold`}
              innerClassName={`text-xl`}
              onClick={handleClick}
            />
          </div>

          <div>
            <h3 className="font-bold text-xl mb-5">WHAT CAN I DO WITH LAND?</h3>
            <p className="flex items-center gap-5 font-semibold font-inter mb-7">
              <span>
                <img src={Star} alt="" className="w-6" />
              </span>
              Start building!
            </p>
            <p className="flex items-center gap-5 font-semibold font-inter mb-7">
              <span>
                <img src={Star} alt="" className="w-6" />
              </span>
              Publish and monetize your Experience
            </p>
            <p className="flex items-center gap-5 font-semibold font-inter mb-7">
              <span>
                <img src={Star} alt="" className="w-6" />
              </span>
              Earn special rewards
            </p>
            <p className="flex items-center gap-5 font-semibold font-inter mb-7">
              <span>
                <img src={Star} alt="" className="w-6" />
              </span>
              Exclusive LAND Owner staking
            </p>
            <p className="flex items-center gap-5 font-semibold font-inter mb-7">
              <span>
                <img src={Star} alt="" className="w-6" />
              </span>
              Sell your LAND
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandModal;
