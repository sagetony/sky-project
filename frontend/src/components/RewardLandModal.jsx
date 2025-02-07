/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { User, banner_l, banner_r, close, coins, gift2 } from "../assets";
import { BlueButton } from "./Button";
import { ethers, BigNumber } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { decodeError } from "ethers-decode-error";

import SkyMateLandStaking from "../../abis/SkyMateLandStaking.sol/SkyMateLandStaking.json";
import SkyMateNFTContractFile from "../../abis/SkyMateNFT.sol/SkyMateNFT.json";

const StakingNFTContractAddress = "0x32bC760D50E5762E7Af269385CD0bB54a5D8B247";
const SkyMateNFTContractAddress = "0xa545665CD001A272d4b99d05b2b0776462c38D03";

const SkyMateLandStakingContractAbi = SkyMateLandStaking.abi;
const SkyMateNFTContractAbi = SkyMateNFTContractFile.abi;

const RewardLandModal = ({ onclose }) => {
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [StakingLandContract, setStakingLandContract] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [claimTimestamp, setClaimTimestamp] = useState(null);
  const [APR, setAPR] = useState(null);
  const [expectedRewards, setexpectedRewards] = useState(null);

  const handleClaim = async (event) => {
    event.preventDefault();
    try {
      if (!isConnected) {
        toast.error("User disconnected");
        return;
      }
      const tx = await StakingLandContract.claimReward(selectedNFTs);
      await tx.wait();
      let receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success(`Transaction Successful`);
      }
    } catch (err) {
      const { error } = decodeError(err);
      if (error == 0xc8155d8f) {
        toast.error(`Transaction failed: Staking Period Not Ended`);
      } else if (error == 0x09449a84) {
        toast.error(`Transaction failed: Contact Admin`);
      } else {
        toast.error(`Transaction failed: ${error.error.message}`);
      }
    }
  };
  const handleUnstake = async (event) => {
    event.preventDefault();
    try {
      if (!isConnected) {
        toast.error("User disconnected");
        return;
      }
      const tx = await StakingLandContract.unstakeLand(selectedNFTs);
      await tx.wait();
      let receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success(`Transaction Successful`);
      }
    } catch (err) {
      const { error } = decodeError(err);
      if (error == 0xc8155d8f) {
        toast.error(`Transaction failed: Staking Period Not Ended`);
      } else {
        toast.error(`Transaction failed: ${error.error.message}`);
      }
    }
  };
  const handleNFTSelection = (tokenId) => {
    setSelectedNFTs(tokenId);
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
      setStakingLandContract(StakingLandContractState);
      setNFTContract(NFTContractState);

      const fetchTokens = async () => {
        if (!StakingLandContract) {
          console.error("StakingLandContract is not initialized");
          return;
        }

        try {
          const walletAddress = await signer.getAddress();
          const tokenIds = await StakingLandContract.getStakedNFTs(
            walletAddress
          );
          const tokenIdsAsNumbers = tokenIds.map((tokenId) =>
            tokenId.toNumber()
          );
          setSelectedNFTs(tokenIdsAsNumbers[0]);
          // Fetch land data for each tokenId
          const fetchedData = await Promise.all(
            tokenIdsAsNumbers.map(async (tokenId) => {
              const land = await NFTContract.getLand(tokenId);
              return {
                tokenId: tokenId.toString(), // Ensure it's a string
                zoneName: land.zoneName
                  ? land.zoneName.toString()
                  : land[0].toString(), // Ensure it's a string
              };
            })
          );
          setStakedNFTs(fetchedData);
        } catch (error) {
          console.error("Error fetching staked NFTs:", error);
        }
      };

      const fetchTotalStaked = async () => {
        try {
          const stakeState = await StakingLandContractState.getStakedLand(
            selectedNFTs
          );
          const aprstate = stakeState.rewardRate;
          const accumulatedRewards = ethers.utils.formatUnits(
            stakeState.accumulatedRewards,
            18
          );

          // Convert the timestamp to a human-readable date
          const lastClaimTimestamp = BigInt(stakeState.lastClaimTimestamp);
          let date;
          if (lastClaimTimestamp === BigInt(0)) {
            date = 0; // Return 0 if the timestamp is 0
          } else {
            date = new Date(Number(lastClaimTimestamp) * 1000); // Convert BigInt to Number for Date
          }

          // Convert seconds to milliseconds
          const getLastClaimTimestampState = date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          setexpectedRewards(accumulatedRewards);
          setAPR(aprstate);
          setClaimTimestamp(getLastClaimTimestampState);
        } catch (error) {
          console.error("Error fetching total staked tokens:", error);
        }
      };

      fetchTokens();
      fetchTotalStaked();
    }
  }, [isConnected]);
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };
  return (
    <div
      className="fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[999px] top-0 left-0"
      onClick={handleModalOverlayClick}
    >
      <div className=" md:max-h-[620px]  [scrollbar-width:none] [--ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[600px] overflow-auto text-white rounded-3xl  w-full lg:w-2/4 md:w-3/4">
        <div className="bg-login p-8 flex justify-between items-start">
          <div className="flex gap-6 font-inter items-start">
            <img src={User} alt="" className="md:w-1/4 w-1/5" />
            <div>
              <h3 className="text-3xl font-bold">MY STAKED LAND REWARDS</h3>
              <p>From SMC pool rewards and revenue sharing!</p>
            </div>{" "}
          </div>
          <img
            src={close}
            onClick={onclose}
            className=" cursor-pointer w-10 hover:opacity-50 "
          />
        </div>
        <div className="bg-white py-10 ">
          <div className=" relative">
            <img src={coins} alt="" className="absolute animate-upAndDown" />
            <div className="bg-login lg:mx-44 md:mx-10 mx-5 pb-10 shadow-card pt-14 rounded-[50px] relative">
              <img
                src={banner_l}
                alt=""
                className="absolute lg:block hidden md:-left-[90px] -left-[92px] top-6"
              />
              <img
                src={banner_r}
                alt=""
                className="absolute lg:block hidden md:-right-[90px] -right-[92px] md:top-7 top-6"
              />
              <div
                className=" shadow-card flex font-inter items-center gap-5 justify-center py-6  text-xl"
                style={{
                  background: `linear-gradient(90deg, #FF970F 0%, #DF5200 100%)`,
                }}
              >
                MY REWARDS{" "}
                <span className="text-4xl font-bold">
                  {" "}
                  {expectedRewards !== null ? `${expectedRewards}` : "0"}
                </span>
              </div>
              <div className="py-10 lg:px-20 px-10 text-[#F9F9F4]">
                <p className="flex justify-between items-center mb-3 font-bold">
                  {/* <span className="font-normal underline">Your shares</span>0 */}
                </p>
                <p className="flex justify-between items-center mb-3 font-bold">
                  <span className="font-normal underline">
                    Next distribution
                  </span>
                  in 30 days
                </p>
                <p className="flex justify-between items-center mb-3 font-bold">
                  <span className="font-normal underline">
                    Last distribution
                  </span>
                  {claimTimestamp !== null ? `${claimTimestamp}` : "0"}
                </p>{" "}
                <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">APR</span>{" "}
                  {APR !== null ? `${APR / 100}%` : "0"}
                </p>
                {/* <p className="font-bold mb-5">SMC POOL</p>
                <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">Reward amount</span>0
                  SMC
                </p> */}
                <p className="font-bold mb-5">REVENUE SHARING</p>
                <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">Reward amount</span>{" "}
                  {expectedRewards !== null ? `${expectedRewards}` : "0"}
                </p>
                {/* <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">
                    Available for claiming
                  </span>
                  0.00%
                </p> */}
              </div>
              {/* Staked NFTs List */}
              <div className="lg:mx-34 mx-5 mt-5">
                <h2 className="text-2xl font-bold mb-3">
                  Select Your Staked Lands
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  {stakedNFTs.length > 0 ? (
                    stakedNFTs.map(({ tokenId, zoneName }) => (
                      <label
                        key={tokenId}
                        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleNFTSelection(tokenId)}
                          checked={selectedNFTs === tokenId}
                        />
                        <span>
                          Land <strong>#{zoneName}</strong>
                        </span>
                      </label>
                    ))
                  ) : (
                    <p>No NFTs staked yet.</p>
                  )}
                </div>
              </div>
              <h3 className="text-center font-itim text-3xl">
                EARN ETHER MONTHLY
              </h3>
            </div>

            <div className="flex lg:mx-37 mx-5 md:flex-row flex-col gap-5 justify-between mt-10 items-center">
              <BlueButton
                text={`Claim Rewards`}
                icon={<img src={gift2} className="w-7" />}
                position={`left`}
                outerClassName={`flex-1 font-semibold`}
                innerClassName={`text-xl`}
                onClick={handleClaim}
              />
              <button
                onClick={handleUnstake}
                className="flex-1 border-[3px] w-full py-2 hover:bg-[#184C7F] hover:text-white rounded-full text-xl font-semibold border-[#184C7F] text-[#184C7F]"
              >
                Unstake NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardLandModal;
