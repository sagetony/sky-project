import { useState, useEffect } from "react";
import { gcal, tether } from "../../assets";
import { ConnectWallet, BlueButton } from "../../components";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { toast } from "sonner";

import StakingContractFile from "../../../abis/Staking.sol/Staking.json";
import SMCTokenContractFile from "../../../abis/SkyMateCoin.sol/SkyMateCoin.json";
const StakingContractAddress = "0x03356EBE91Afde8595ebF1dDc781E44fa7917414";
const SMCTokenContractAddress = "0xdB8f55b83a24e84D50739E1FC971E88093993C92";
const StakingContractAbi = StakingContractFile.abi;
const SMCTokenContractAbi = SMCTokenContractFile.abi;

const StakeCard = ({ setTotalRewardDistributed }) => {
  const [val, setVal] = useState(0);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("30");
  const [totalStaked, setTotalStaked] = useState(null);
  const [StakingContract, setStakingContractState] = useState(null);
  const [SMCTokenContract, setSMCTokenContract] = useState(null);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleStakeModalClick = () => {
    setModalOpen2(!modalOpen2);
  };
  const handleStake = async (event) => {
    event.preventDefault();
    const amount = val;
    const period = selectedPurpose;
    if (!isConnected) {
      toast.error("User disconnected");
      return;
    }

    try {
      const _amount = ethers.utils.parseUnits(amount, "ether");
      if (_amount == 0) {
        toast.error(`Transaction failed: Amount Cannot be zero`);
      } else {
        const approveTx = await SMCTokenContract.approve(
          StakingContractAddress,
          _amount
        );

        await approveTx.wait();

        const tx = await StakingContract.stakeTokens(_amount, period);
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          toast.success(`Staking successful for ${period} days`);
        }
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
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
      const SMCTokenContractState = new ethers.Contract(
        SMCTokenContractAddress,
        SMCTokenContractAbi,
        signer
      );

      setStakingContractState(StakingContractState);
      setSMCTokenContract(SMCTokenContractState);

      const fetchTotalStaked = async () => {
        const amount = await StakingContract.totalStakedToken();
        const total = ethers.utils.formatUnits(amount, 18);
        setTotalStaked(total);
      };
      const fetchTotalRewardDistributed = async () => {
        const amount = await StakingContract.totalRewardDistributed();
        const rewards = ethers.utils.formatUnits(amount, 18);
        setTotalRewardDistributed(rewards);
      };
      fetchTotalStaked();
      fetchTotalRewardDistributed();
    }
  }, [isConnected]);
  return (
    <div>
      <div className="bg-login hover:ring-2 text-white p-6 py-6 md:py-3 sm:px-16 flex lg:flex-row flex-col lg:items-center justify-between rounded-[50px] mb-5 cursor-pointer shadow-cards1">
        <div className="flex flex-col lg:items-center">
          <img src={tether} className="w-[100px] rounded-full" />
          <p className=" mt-1 font-itim text-2xl">Cryto Name</p>
          <p className="font-[300] text-sm opacity-50">Stake & Earn</p>
        </div>
        <div className="lg:w-[25%] w-full lg:my-0 my-7">
          <p className="font-itim text-xl mb-2">Stake period:</p>
          <div className="flex gap-2 mb-2 border-2 justify-between border-white rounded-lg p-2 py-1">
            <button
              className={`rounded-md lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === "30"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent  text-slate-300"
              }`}
              onClick={() => handleSelect("30")}
            >
              30D
            </button>{" "}
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === "90"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent  text-slate-300"
              }`}
              onClick={() => handleSelect("90")}
            >
              90D
            </button>
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === "360"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent   text-slate-300"
              }`}
              onClick={() => handleSelect("360")}
            >
              360D
            </button>
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === "720"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent   text-slate-300"
              }`}
              onClick={() => handleSelect("720")}
            >
              720D
            </button>{" "}
          </div>
        </div>
        {isConnected ? (
          <div className="lg:w-[20%] w-full lg:mb-0 mb-9 lg:text-center">
            <p className="font-itim text-xl mb-1">Total Staked:</p>
            <p className="font[300] font-inter lg:text-right text-slate-200">
              {totalStaked !== null ? `${totalStaked} SMC` : "Loading ..."}
            </p>
            <p className="text-slate-300 text-sm opacity-50 lg:text-right font-inter font-[200]">
              ~{totalStaked !== null ? `$${totalStaked * 0.01}` : "Loading ..."}
            </p>
          </div>
        ) : null}
        <div className="flex lg:mb-0 mb-14 lg:items-center flex-col">
          <p className="font-itim text-xl">APR:</p>
          <div className="flex items-center gap-2">
            <p className="text-[16px] text-slate-300">
              {selectedPurpose === "30"
                ? "1%~3%"
                : selectedPurpose === "90"
                ? "4%~7%"
                : selectedPurpose === "360"
                ? "8%~10%"
                : selectedPurpose === "720"
                ? "11%~20%"
                : null}{" "}
            </p>{" "}
            <img
              src={gcal}
              className="w-5 h-5"
              onClick={handleStakeModalClick}
            />
          </div>
        </div>
        <div className="lg:w-[25%] w-full flex flex-col justify-center lg:items-center">
          <ConnectWallet className={` w-full font-bold font-inter`} />
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full bg-[#2A86E0] mb-4 rounded-[17px] hover:ring-2 outline-none px-3 md:px-6 text-xl font-[300] py-4 mt-4"
          />
          <BlueButton
            onClick={handleStake}
            text="Stake Token"
            innerClassName="text-lg font-inter font-semibold flex-row-reverse gap-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
