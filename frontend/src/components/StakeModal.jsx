/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { decodeError } from "ethers-decode-error";

import { close, User } from "../assets";
import { BlueButton } from "./Button";

import axios from "axios";

import SkyMateLandStaking from "../../abis/SkyMateLandStaking.sol/SkyMateLandStaking.json";
import SkyMateNFTContractFile from "../../abis/SkyMateNFT.sol/SkyMateNFT.json";

const StakingNFTContractAddress = "0x32bC760D50E5762E7Af269385CD0bB54a5D8B247";
const SkyMateNFTContractAddress = "0xF22Bf09A14f37406F46F507Bd1cC5F3FE6909b00";

const SkyMateLandStakingContractAbi = SkyMateLandStaking.abi;
const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;

const StakeModal = ({ onclose, selectedPurpose }) => {
  const [nfts, setNfts] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [StakingLandContract, setStakingLandContractState] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };

  const handleSelectNFT = (tokenId) => {
    setSelectedTokenId(tokenId);
  };
  // Get NFTs
  async function getNFTsByOwner(signer) {
    const walletAddress = await signer.getAddress();

    try {
      const response = await axios.get(
        `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${walletAddress}/nfts`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setNfts(response.data.nfts || []);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  }

  const handleStake = async (event) => {
    event.preventDefault();
    let duration = 0;
    if (selectedPurpose == 30 || selectedPurpose == 90) {
      duration = selectedPurpose * 86400;
    } else if (selectedPurpose == 1) {
      duration = 365 * 86400;
    } else if (selectedPurpose == 2) {
      duration = 365 * 2 * 86400;
    }

    if (!isConnected) {
      toast.error("User disconnected");
      return;
    }
    try {
      if (selectedTokenId == null) {
        toast.error("Select NFT");
      } else {
        const approveTx = await NFTContract.approve(
          StakingNFTContractAddress,
          selectedTokenId
        );
        await approveTx.wait();
        const letgo = await NFTContract.ownerOf(selectedTokenId);
        console.log(letgo, selectedTokenId);
        const tx = await StakingLandContract.stakeLand(
          selectedTokenId,
          duration
        );
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          {
            selectedPurpose === "1" || selectedPurpose === "2"
              ? toast.success(`Staking successful for ${selectedPurpose} years`)
              : toast.success(`Staking successful for ${selectedPurpose} days`);
          }
        }
      }
    } catch (err) {
      const { error } = decodeError(err);
      //   console.log("Revert reason:", error);
      if (error == 0x7e273289) {
        toast.error(`Transaction failed: NFT doesn't exist`);
      } else if (error == 0xe837e79f) {
        toast.error(`Transaction failed: Invalid Staking Duration`);
      } else if (error == 0x11a673a5) {
        toast.error(`Transaction failed: Not the Owner`);
      } else {
        toast.error(`Transaction failed: ${error.error.message}`);
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();

      // The Contract object
      const StakingLandContractState = new ethers.Contract(
        StakingNFTContractAddress,
        SkyMateLandStakingContractAbi,
        signer
      );
      const NFTContractState = new ethers.Contract(
        SkyMateNFTContractAddress,
        SkyMateNFTContractAbi,
        signer
      );
      setStakingLandContractState(StakingLandContractState);
      setNFTContract(NFTContractState);

      try {
        const getNFTs = async () => {
          await getNFTsByOwner(signer);
        };
        getNFTs();
        if (nfts.length > 0) {
          setSelectedTokenId(Number(nfts[0].identifier));
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    }
  }, [isConnected]);
  return (
    <div
      className="fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[999px] top-0 left-0"
      onClick={handleModalOverlayClick}
    >
      {" "}
      <div className=" md:max-h-[620px]  [scrollbar-width:none] [--ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[600px] overflow-auto text-white rounded-3xl  w-full lg:w-2/4 md:w-3/4">
        <div className="bg-login font-itim p-8 ">
          <div className="flex justify-between mb-5 items-start">
            <h2 className=" text-4xl"> Stake Summary</h2>
            <img
              src={close}
              onClick={onclose}
              className=" cursor-pointer w-10 hover:opacity-50 "
            />
          </div>{" "}
          <h3 className="text-lg font-inter">
            Stake Period:{" "}
            <span className="text-orange-400 font-bold">
              {selectedPurpose === "1" || selectedPurpose === "2"
                ? `${selectedPurpose}YR`
                : `${selectedPurpose}D`}
            </span>
          </h3>
          <h3 className="text-lg font-inter mt-2">Select NFT: </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md"
                onClick={() => handleSelectNFT(Number(nft.identifier))}
              >
                <img
                  src={nft.image_url || User}
                  alt={nft.name}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-center font-semibold mt-2">
                  {nft.name || `NFT #${nft.identifier}`}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="w-fit">
              <BlueButton
                text={`Stake Land`}
                position={`left`}
                innerClassName={`px-9 text-xl`}
                onClick={handleStake}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeModal;
