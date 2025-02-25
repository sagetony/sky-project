import { useState } from "react";
import {
  Cloud1,
  Cloud2,
  Cloud3,
  merc,
  bnb2,
  reload,
  usd,
  usdc,
  usdt,
  bnb,
  Logo,
  eth,
} from "../assets";
import { ConnectWallet, Guide, Icons } from "../components";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import { toast } from "sonner";

import SMCPurchaseContractFile from "../../abis/SkyMatePurchaseToken.sol/SkyMatePurchaseToken.json";
import USDTFile from "../../abis/MockERC20.sol/MockERC20.json";

const SMCPurchaseContractAddress = "0xb087F69F9BEe49964F082557E00dFa2CF2B1dEDc";
const SMCPurchaseContractAbi = SMCPurchaseContractFile.abi;
const usdtContractAddress = "0x73A862B01FA7336A20b70D7222478B830779BEa5";

const Purchase = () => {
  const [val, setVal] = useState(0);
  const [val2, setVal2] = useState(0.23452);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [selectedIcon, setSelectedIcon] = useState(usdt);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const currencies = [
    // { name: "BNB", icon: bnb },
    { name: "USDT", icon: usdt },
    // { name: "USDC", icon: usdc },
  ];

  const handleSelect = (currency, icon) => {
    setSelectedCurrency(currency);
    setSelectedIcon(icon);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const amount = val;

    if (!isConnected) {
      toast.error("User disconnected");
      return;
    }

    if (amount == 0) {
      toast.error("Can't buy with zero amount");
      return;
    }

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();

    // // The Contract object
    const SMCPurchaseContract = new ethers.Contract(
      SMCPurchaseContractAddress,
      SMCPurchaseContractAbi,
      signer
    );

    const USDTContract = new ethers.Contract(
      usdtContractAddress,
      USDTFile.abi,
      signer
    );

    const _amount = ethers.utils.parseUnits(amount, 6);
    try {
      const approveTx = await USDTContract.approve(
        SMCPurchaseContractAddress,
        _amount
      );
      await approveTx.wait();

      const allowance = await USDTContract.allowance(
        await signer.getAddress(),
        SMCPurchaseContractAddress
      );
      console.log(`Allowance: ${allowance.toString()}`);

      const tx = await SMCPurchaseContract.buy(usdtContractAddress, _amount);

      const receipt = await tx.wait();
      console.log(receipt);
      if (receipt.status === 1) {
        toast.success("Purchase successful");
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
    }
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
          src={Cloud3}
          alt=""
          className="absolute md:top-[800px] top-[750px] right-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud2}
          alt=""
          className="absolute md:top-[1200px] top-[1300px] left-0 w-64 animate-upAndDown"
        />
      </div>

      <div className="px-5 md:px-20 pb-20 relative z-10">
        <h2
          className="text-white font-itim  text-3xl mb-1 md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Buy Crypto
        </h2>
        <p
          className="text-slate-300 font-inter font-[400] text-[16px]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Buy crypto in just a few clicks
        </p>
        <div className="">
          <div className=" font-inter md:px-20">
            <div className="rounded-xl bg-cards1 relative md:px-36 p-5 bg-login md:p-12 mt-10 text-white">
              <div
                className={`bg-[#104C86] border-2 border-white rounded-[17px] relative ${
                  openDropdown ? "mb-8" : "mb-8"
                } `}
                // data-aos='fade-up'
                // data-aos-duration='1000'
              >
                <input
                  className="w-full bg-[#104C86] rounded-[17px] hover:ring-2 outline-none px-3 md:px-6 text-xl font-[300] py-4"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
                <div className="absolute flex justify-between items-center top-4 md:top-3 right-3 gap-3 md:gap-5">
                  <Icons
                    icon="pepicons-pencil:line-y"
                    className="md:text-4xl text-3xl text-white "
                  />

                  <div
                    className="flex justify-between cursor-pointer items-center md:gap-5 gap-3"
                    // onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    <img src={selectedIcon} className="md:w-8 w-6 md:h-8 h-6" />
                    <p className="md:text-2xl text-xl">{selectedCurrency}</p>
                    <Icons
                      icon="ooui:down-triangle"
                      className="md:text-2xl text-xl"
                    />{" "}
                  </div>
                </div>{" "}
                {/* {openDropdown && (
                  <div className="absolute z-50 right-0 w-[200px] rounded-lg bg-hbtn2 py-3">
                    {currencies.map((curr, i) => (
                      <p
                        key={i}
                        className="flex items-center gap-5 hover:bg-white px-3 py-1 hover:text-[#104C86] cursor-pointer"
                        onClick={() => {
                          handleSelect(curr.name, curr.icon);
                          setOpenDropdown(false);
                        }}
                      >
                        <img
                          src={curr.icon}
                          className="md:w-7 w-5 md:h-7 h-5"
                        />
                        <p className="md:text-xl text-xl">{curr.name}</p>
                      </p>
                    ))}
                  </div>
                )} */}
              </div>
              {/* <div
                className="bg-[#104C86] border-2 border-white rounded-[17px] relative mb-8"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <input
                  className="w-full bg-[#104C86] rounded-[17px] hover:ring-2 outline-none  px-3 md:px-6 text-xl font-[300] py-4"
                  value={val2}
                  disabled
                  onChange={(e) => setVal2(e.target.value)}
                />
                <div className="absolute flex justify-between items-center top-3 md:top-2 right-3 gap-2 md:gap-4">
                  <Icons
                    icon="pepicons-pencil:line-y"
                    className="md:text-4xl text-3xl text-white "
                  />
                  <img src={bnb} className="md:w-8 w-6 md:h-8 h-6" />
                  <div className="text-center">
                    <p className="md:text-2xl text-xl p-0">BNB</p>
                    <p className="md:text-xs text-[10px] font-[200] -mt-1">
                      On binance
                    </p>
                  </div>
                  <Icons
                    icon="ooui:down-triangle"
                    className="md:text-2xl text-xl "
                  />
                </div>
              </div> */}
              <div
                className="bg-[#104C86] border-2 border-white rounded-[17px] relative mb-8"
                data-aos="fade-up"
                data-aos-duration="1400"
              >
                <input className="w-full bg-[#104C86] rounded-[17px] hover:ring-2 outline-none px-6 text-xl font-[300] py-4" />
                <div className="absolute flex justify-between gap-2 md:gap-5 items-center top-4 md:top-3 left-3">
                  <img
                    src={Logo}
                    className="md:w-8 w-6 md:h-8 h-6 sm:block hidden"
                  />
                  <p className="md:text-2xl text-xl sm:block hidden">SMC</p>
                  <p className="font-[200] md:text-xl ">1 SMC=$0.01</p>
                </div>
                <div className="absolute flex justify-between items-center top-3 right-3 gap-2 md:gap-4">
                  <Icons
                    icon="pepicons-pencil:line-y"
                    className="md:text-4xl text-3xl text-white "
                  />
                  <div className="bg-[#009BF3] md:px-2 px-1 py-1 rounded-md flex items-center">
                    <p className="text-xs md:text-[16px]">Best price</p>
                    <Icons icon="hugeicons:flash" />
                  </div>
                  <Icons
                    icon="ooui:down-triangle"
                    className="md:text-2xl text-xl"
                  />
                </div>
              </div>
              <div
                className="flex justify-center items-center mb-16"
                data-aos="fade-up"
                data-aos-duration="1600"
              >
                <div className="flex bg-[#104C86] border-2 border-white items-center gap-3 rounded-full px-6 py-1">
                  <img src={eth} className="w-8 h-8" />{" "}
                  <p className="text-lg font-[200] ">Ethereum Chain</p>
                </div>
              </div>
              {/* <div
                className="bg-[#104C86] border-2 border-white rounded-[17px] relative mb-8"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <input className="w-full bg-[#104C86] rounded-[17px] hover:ring-2 outline-none px-6 text-xl font-[300] py-4" />
                <div className="absolute flex justify-between gap-2 md:gap-5 items-center top-4 md:top-3 left-3">
                  <p className="md:text-2xl text-xl  ">Est total fees:</p>
                  <p className="font-[200] md:text-xl ">$2.98</p>
                </div>
                <div className="absolute flex justify-between items-center top-3 right-3 gap-2 md:gap-4">
                  <Icons
                    icon="pepicons-pencil:line-y"
                    className="md:text-4xl text-3xl text-white "
                  />
                  <div className="md:px-2 px-1 py-1 rounded-md flex items-center">
                    <p className="text-xs md:text-[16px]">Show details</p>
                  </div>
                  <Icons
                    icon="ooui:down-triangle"
                    className="md:text-2xl text-xl"
                  />
                </div>
              </div> */}
              <div className="flex justify-center gap-6 items-center">
                <div className="sm:w-2/3 w-full md:w-1/3">
                  {/* <BlueButton
                    text={`Connect wallet`}
                    innerClassName={`text-lg`}
                    outerClassName={``}
                  /> */}
                  <ConnectWallet className={`text-lg`} />
                  {isConnected ? (
                    <button
                      onClick={handleSubmit}
                      className={`shadow-custom-inset-top mt-5 w-full py-0 rounded-full text-white hover:text-[#1e90ff] text-3xl hover:from-white  hover:to-white bg-gradient-to-r from-[#51d2ff] to-[#1e90ff] border-2 border-[#c9ebff] `}
                    >
                      <span
                        className={`flex shadow-custom-inset-bottom items-center justify-center gap-6 w-full py-2 rounded-full text-3xl`}
                      >
                        Buy
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>
              <div className=" " data-aos="fade-up" data-aos-duration="1200">
                <p className="text-slate-300 font-[300] text-sm mt-2 text-center">
                  By continuing you agree to our terms of service
                </p>

                <img
                  src={reload}
                  className="text-right absolute cursor-pointer sm:block hidden right-6 bottom-6 w-8"
                />
              </div>
            </div>
          </div>
        </div>
        <Guide />
      </div>
    </div>
  );
};

export default Purchase;
