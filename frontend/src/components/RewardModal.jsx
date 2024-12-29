/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { User, banner_l, banner_r, close, coins, gift2 } from "../assets";
import { BlueButton } from "./Button";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";

import StakingContractFile from "../../abis/Staking.sol/Staking.json";
// import SMCTokenContractFile from '../../abis/SkyMateCoin.sol/SkyMateCoin.json';
const StakingContractAddress = "0x03356EBE91Afde8595ebF1dDc781E44fa7917414";
const StakingContractAbi = StakingContractFile.abi;

const RewardModal = ({ onclose }) => {
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [StakingContract, setStakingContractState] = useState(null);
  // const [SMCTokenContract, setSMCTokenContract] = useState(null);
  // const [selectedPurpose, setSelectedPurpose] = useState('30');
  const [totalStaked, setTotalStaked] = useState(null);
  const [stake, setStake] = useState(null);
  const [claimTimestamp, setClaimTimestamp] = useState(null);
  const [nextClaimTimestamp, setNextClaimTimestamp] = useState(null);
  const [amountStaked, setAmountStaked] = useState(null);
  const [APR, setAPR] = useState(null);
  const [currentRewards, setcurrentRewards] = useState(null);
  const [expectedRewards, setexpectedRewards] = useState(null);
  const [accumulatedRewards, setaccumulatedRewards] = useState(null);

  const handleClaim = async (event) => {
    event.preventDefault();
    try {
      if (!isConnected) toast.error("User disconnected");
      // const index = await StakingContract.getRecentStakeIndex();
      const recentIndex = staking.getRecentStakeIndex();
      console.log(recentIndex);
      const tx = await StakingContract.unstake(recentIndex);
      await tx.wait();
      let receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success(`Transaction Successful`);
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
      // Handle specific error codes
    }
  };
  useEffect(() => {
    if (isConnected) {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();

      // The Contract object
      const StakingContractState = new ethers.Contract(
        StakingContractAddress,
        StakingContractAbi,
        signer
      );

      setStakingContractState(StakingContractState);

      const fetchTotalStaked = async () => {
        try {
          const totalStaked = await StakingContractState.totalStakedToken();
          const stakeState = await StakingContractState.getStake(0);
          const total = ethers.utils.formatUnits(totalStaked, 18);
          const amountState = ethers.utils.formatUnits(stakeState.amount, 18);

          const aprstate = stakeState.annualYieldRate;
          const accumulatedRewardsState = stakeState.accumulatedRewards;
          const currentRewardsState = stakeState.currentRewards;
          const expectedRewardsState = ethers.utils.formatUnits(
            stakeState.expectedRewards,
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

          const nextdate = new Date(stakeState.expectedRewardTimestamp * 1000);
          console.log(stakeState.lastClaimTimestamp);
          // Convert seconds to milliseconds
          const getLastClaimTimestampState = date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          const getNextClaimTimestampState = nextdate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          // calculate the reward
          let rewards =
            (amountState * stakeState.annualYieldRate * 30) / (360 * 100);

          setaccumulatedRewards(accumulatedRewardsState);
          setcurrentRewards(rewards);
          setexpectedRewards(expectedRewardsState);
          setAPR(aprstate);
          setClaimTimestamp(getLastClaimTimestampState);
          setNextClaimTimestamp(getNextClaimTimestampState);
          setAmountStaked(amountState);
          setTotalStaked(total);
          setStake(stakeState);
        } catch (error) {
          // setTotalStaked(0);
          console.error("Error fetching total staked tokens:", error);
        }
      };

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
              <h3 className="text-3xl font-bold">CMC Reward/Yield</h3>
              <p>From CMC pool rewards and revenue sharing!</p>
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
                MY CMC{" "}
                <span className="text-4xl font-bold">
                  {" "}
                  {amountStaked !== null ? `${amountStaked}` : "0"}
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
                  {APR !== null ? `${APR}%` : "0"}
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
                <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">TOTAL</span>{" "}
                  {amountStaked !== null
                    ? `${Number(amountStaked) + Number(expectedRewards)}`
                    : "0"}{" "}
                </p>
                {/* <p className="flex justify-between items-center mb-3  ">
                  <span className="font-normal underline">
                    Available for claiming
                  </span>
                  0.00%
                </p> */}
              </div>
              <h3 className="text-center font-itim text-3xl">
                EARN CMC MONTHLY
              </h3>
            </div>
            <div className="flex lg:mx-44 mx-5 md:flex-row flex-col gap-5 justify-between mt-10 items-center">
              <BlueButton
                text={`Claim all`}
                icon={<img src={gift2} className="w-7" />}
                position={`left`}
                outerClassName={`flex-1 font-semibold`}
                innerClassName={`text-xl`}
                onClick={handleClaim}
              />
              <button className="flex-1 border-[3px] w-full py-2 hover:bg-[#184C7F] hover:text-white rounded-full text-xl font-semibold border-[#184C7F] text-[#184C7F]">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
