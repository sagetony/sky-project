import { useState } from "react";
import {
  benefits_1,
  benefits_2,
  Cloud1,
  Cloud2,
  Cloud3,
  Land_Staking,
  Stake_Label,
} from "../assets";
import { BlueButton, RewardLandModal } from "../components";
import StakeCard from "./components/StakeCard";
import StakeLandCard from "./components/StakeLandCard";
import { FiGift } from "react-icons/fi";

const Staking = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [totalRewardDistributed, setTotalRewardDistributed] = useState(null);

  const handleRewardModalClick = () => {
    setModalOpen(!modalOpen);
  };

  const closeRewardModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="pt-36 bg-pages relative">
      <div className="absolute inset-0 z-0">
        <img
          src={Cloud1}
          alt=""
          className="absolute md:top-[450px] top-[200px] left-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud2}
          alt=""
          className="absolute md:top-[1200px] top-[2600px] left-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[800px] top-[1800px] right-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[1600px] top-[3500px] right-0 w-64 animate-upAndDown"
        />
      </div>

      <div className="px-5 md:px-20 relative z-10">
        <h2
          className="text-white font-itim  text-3xl mb-1 md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Easy Staking
        </h2>
        <p
          className="text-slate-300 font-inter font-[400] text-[16px]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Simple Earn Staking
        </p>
        {/* <div className='flex md:flex-row flex-col mt-5 gap-5 md:w-[500px]'>
          <BlueButton
            text='Token Staking'
            innerClassName='text-lg shadow-none'
            outerClassName=' bg-none hover:bg-white hover:text-[#FCA417] bg-[#FCA417] shadown-none border-white'
          />
          <BlueButton
            text='Land Staking'
            innerClassName='text-lg shadow-none'
            outerClassName='bg-none hover:bg-white shadown-none border-white'
          />
        </div> */}
        <img src={Stake_Label} alt="" className="w-[300px]" />
        <div className="mt-10">
          <StakeCard setTotalRewardDistributed={setTotalRewardDistributed} />
        </div>
        <div className="py-16">
          <div className="bg-[#2A86E0] rounded-lg text-white shadow-section">
            <h2 className="p-5 px-7 font-[900] text-2xl">
              Benefits of Token Staking
            </h2>
            <div className="lg:p-16 p-10 rounded-b-lg bg-white">
              <div className="bg-login px-10 pr-20 rounded-[100px] shadow-card">
                <div className="flex md:gap-0 gap-10 md:flex-row  flex-col justify-between">
                  <div className=" w-full md:w-[400px] lg:w-[550px]  rounded-[60px] p-5 py-10 md:px-10 ">
                    <h3 className="font-itim text-3xl font-[400]">Earn SMC</h3>
                    <p className="font-[300] font-itim mt-2">
                      Total Distributed
                    </p>
                    <p className="font-[300] font-inter text-[14px]">
                      {totalRewardDistributed !== null
                        ? `${totalRewardDistributed} SMC`
                        : "Loading ..."}
                    </p>
                    <ul className="list-disc font-itim my-10 mt-5">
                      <li className="ml-6">Monthly revenue sharing</li>
                      <li className="ml-6">Monthly SMC pool rewards</li>
                    </ul>
                    <BlueButton
                      onClick={handleRewardModalClick}
                      text="Check Reward"
                      innerClassName="text-lg font-inter font-semibold flex-row-reverse gap-[10px]"
                      icon={<FiGift className="text-[22px]" />}
                    />
                  </div>
                  <img src={benefits_1} alt="" className="w-[320px]  -mb-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={Land_Staking} alt="" className="w-[300px]" />
        <div className="mt-10">
          <StakeLandCard />
        </div>
        <div className="py-16">
          <div className="bg-[#2A86E0] rounded-lg text-white shadow-section">
            <h2 className="p-5 px-7 font-[900] text-2xl">
              Benefits of Land Staking
            </h2>
            <div className="lg:p-16 p-10 rounded-b-lg bg-white">
              <div className="bg-login px-10 pl-20 rounded-[100px] shadow-card">
                <div className="flex md:gap-0 gap-10 md:flex-row  flex-col justify-between">
                  <img
                    src={benefits_2}
                    alt=""
                    className="w-[340px]  -mb-6 -mt-6"
                  />
                  <div className=" w-full md:w-[400px] lg:w-[550px]  rounded-[60px] p-5 py-10 md:px-10 ">
                    <h3 className="font-itim text-3xl font-[400]">Earn ETH</h3>
                    <p className="font-[300] font-itim mt-2">
                      Total Distributed
                    </p>
                    <p className="font-[300] font-inter text-[14px]">
                      27587.7 ETH
                    </p>
                    <ul className="list-disc font-itim my-10 mt-5">
                      <li className="ml-6">Monthly revenue sharing</li>
                      <li className="ml-6">Monthly CAKE pool rewards</li>
                    </ul>
                    <BlueButton
                      onClick={handleRewardModalClick}
                      text="Check Reward"
                      innerClassName="text-lg font-inter font-semibold flex-row-reverse gap-[10px]"
                      icon={<FiGift className="text-[22px]" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {modalOpen && <RewardLandModal onclose={closeRewardModal} />}
      </div>
    </div>
  );
};

export default Staking;
