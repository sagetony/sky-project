/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { gcal, tether } from "../../assets";
import { ConnectWallet, BlueButton, StakeModal } from "../../components";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { toast } from "sonner";

import StakingContractFile from "../../../abis/Staking.sol/Staking.json";
import SMCTokenContractFile from "../../../abis/SkyMateCoin.sol/SkyMateCoin.json";
const StakingContractAddress = "0x4Fbc0B8B1583D6fC4d4bd893d08D4121C5D33e93";
const SMCTokenContractAddress = "0xdB8f55b83a24e84D50739E1FC971E88093993C92";
const StakingContractAbi = StakingContractFile.abi;
const SMCTokenContractAbi = SMCTokenContractFile.abi;

const StakeLandCard = ({ setTotalRewardDistributed }) => {
  const [val, setVal] = useState(0);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("30");
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleStakeModalClick = () => {
    setModalOpen2(!modalOpen2);
  };

  const handleStakeModalClick3 = () => {
    if (!isConnected) {
      toast.error("User disconnected");
      return;
    }
    setModalOpen3(!modalOpen3);
  };

  const closeRewardModal = () => {
    setModalOpen3(false);
  };

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
                selectedPurpose === "1"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent   text-slate-300"
              }`}
              onClick={() => handleSelect("1")}
            >
              1YR
            </button>
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === "2"
                  ? "bg-[#2A86E0] text-white "
                  : "bg-transparent   text-slate-300"
              }`}
              onClick={() => handleSelect("2")}
            >
              2YR
            </button>{" "}
          </div>
        </div>

        <div className="flex lg:mb-0 mb-14 lg:items-center flex-col">
          <p className="font-itim text-xl">APR:</p>
          <div className="flex items-center gap-2">
            <p className="text-[16px] text-slate-300">
              {selectedPurpose === "30"
                ? "1%~3%"
                : selectedPurpose === "90"
                ? "1%~5%"
                : selectedPurpose === "1"
                ? "1%~8%"
                : selectedPurpose === "2"
                ? "1%~12%"
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
          {/* <ConnectWallet className={` w-full font-bold font-inter`} /> */}
          {/* <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full bg-[#2A86E0] mb-4 rounded-[17px] hover:ring-2 outline-none px-3 md:px-6 text-xl font-[300] py-4 mt-4"
          /> */}
          <BlueButton
            onClick={handleStakeModalClick3}
            text="Proceed"
            innerClassName="text-lg font-inter font-semibold flex-row-reverse gap-[10px]"
          />

          {modalOpen3 && (
            <StakeModal
              onclose={closeRewardModal}
              selectedPurpose={selectedPurpose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StakeLandCard;
