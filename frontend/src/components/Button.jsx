/* eslint-disable react/prop-types */
// import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia, mainnet, bscTestnet } from "@reown/appkit/networks";
import { createSIWE } from "../utils/siweUtils";

// 1. Get projectId
const projectId = "d4b4ea4d0b9e81094db8e4fd59a8eb87";

// 3. Create a metadata object - optional
const metadata = {
  name: "Skymetacity",
  description: "Sky Meta City",
  url: "https://sky-project-mu.vercel.app", // origin must match your domain & subdomain
  icons: ["https://sky-project-mu.vercel.app/assets/LOGO-B700Bdft.png"],
};

// 4. Create a AppKit instance
export const chains = [mainnet, sepolia, bscTestnet];

const siweConfig = createSIWE(chains);

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia, mainnet, bscTestnet],
  projectId,
  siweConfig,
  features: {
    email: false,
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    emailShowWallets: false,
  },
});

const PurpleButton = ({
  onClick,
  icon,
  loading,
  text,
  disabled,
  loadText,
  innerClassName,
  outerClassName,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`shadow-custom-inset-top w-full py-0 rounded-full text-white hover:text-[#a874ff] text-3xl hover:from-white  hover:to-white bg-gradient-to-r from-[#b084ff] to-[#a874ff] border-2 border-[#e3caff] ${outerClassName} `}
    >
      <span
        className={`flex shadow-custom-inset-bottom items-center justify-center gap-6 w-full py-2 rounded-full text-3xl ${innerClassName}`}
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className={`mr-2 animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5  `}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadText}
          </div>
        ) : (
          <>
            {icon}
            {text}
          </>
        )}
      </span>
    </button>
  );
};
const BlueButton = ({
  onClick,
  icon,
  loading,
  text,
  disabled,
  loadText,
  innerClassName,
  outerClassName,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${outerClassName} shadow-custom-inset-top  w-full py-0 rounded-full text-white hover:text-[#1e90ff] text-3xl hover:from-white  hover:to-white bg-gradient-to-r from-[#51d2ff] to-[#1e90ff] border-2 border-[#c9ebff] `}
    >
      <span
        className={`flex shadow-custom-inset-bottom items-center justify-center gap-6 w-full py-2 rounded-full text-3xl ${innerClassName}`}
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className={`mr-2 animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5  `}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadText}
          </div>
        ) : (
          <>
            {icon}
            {text}
          </>
        )}
      </span>
    </button>
  );
};

const CloseButton = ({ route }) => {
  const naviagte = useNavigate();

  return (
    <button
      onClick={() => naviagte(route)}
      className="border bg-gradient-to-r from-[#69CBF4] to-[#5DB5E3] text-white px-5 flex items-center gap-2 py-2 text-xl border-white rounded-[100px] pr-7 mb-10 hover:to-white hover:from-white hover:text-[#1e90ff]"
    >
      <IoChevronBack /> BACK
    </button>
  );
};

// import WalletModal from '../modal/WalletModal';

const ConnectWallet = ({ className, innerClassName, outerClassName }) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { t } = useTranslation();

  // async function onSignMessage() {
  //   if (token) {
  //     return null;
  //   } else {
  //     const provider = new ethers.providers.Web3Provider(
  //       walletProvider,
  //       chainId
  //     );
  //     const signer = provider.getSigner(address);
  //     // Request a nonce from your backend
  //     const { data } = await axios.get("https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/auth/nonce", {
  //       params: { address },
  //     });
  //     const nonce = data.nonce;

  //     const signature = await signer?.signMessage(nonce);

  //     // // Send the signed message to your backend for verification
  //     const response = await axios.post("https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/auth/verify", {
  //       address,
  //       signature: signature,
  //       nonce,
  //     });
  //     console.log("Authenticated successfully:", response.data.token);
  //     sessionStorage.setItem("ddhcnvK2", response.data.token);
  //     sessionStorage.setItem("auth", response.data.user);
  //   }
  // }
  // async function onSignOut(params) {
  //   await disconnect();

  //   sessionStorage.removeItem("ddhcnvK2");
  //   sessionStorage.removeItem("auth");
  // }

  return (
    <div className={className}>
        <BlueButton
        text={
          isConnected
            ? `${address.substring(0, 6)}...${address.substring(
                address.length - 4
              )}`
            : `${t("connect_wallet")}`
        }
        innerClassName={`text-xl ${innerClassName}`}
        outerClassName={`${outerClassName}`}
        onClick={() => open()}
      />
      {/* <appkit-button /> */}
      {/* {modalOpen && <WalletModal onclose={closeWalletModal} />} */}
    </div>
  );
};

export { PurpleButton, BlueButton, CloseButton, ConnectWallet };
