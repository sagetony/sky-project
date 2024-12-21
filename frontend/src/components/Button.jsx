/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from '@reown/appkit/react';
import { ethers } from 'ethers';
import axios from 'axios';

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
          <div className='flex items-center'>
            <svg
              className={`mr-2 animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5  `}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
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
          <div className='flex items-center'>
            <svg
              className={`mr-2 animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5  `}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
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
      className='border bg-gradient-to-r from-[#69CBF4] to-[#5DB5E3] text-white px-5 flex items-center gap-2 py-2 text-xl border-white rounded-[100px] pr-7 mb-10 hover:to-white hover:from-white hover:text-[#1e90ff]'
    >
      <IoChevronBack /> BACK
    </button>
  );
};

// import WalletModal from '../modal/WalletModal';

const ConnectWallet = ({ className, innerClassName, outerClassName }) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { disconnect } = useDisconnect();
  const { walletProvider } = useAppKitProvider('eip155');
  // const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const token = sessionStorage.getItem('ddhcnvK2');
  const [hasRun, setHasRun] = useState(false); // Tracks if the logic has run

  async function onSignMessage() {
    if (token) {
      return null;
    } else {
      const provider = new ethers.providers.Web3Provider(
        walletProvider,
        chainId
      );
      // Request a nonce from your backend
      const signer = provider.getSigner(address);

      const { data } = await axios.get('https://smcc99.com/api/auth/nonce', {
        params: { address },
      });
      const nonce = data.nonce;
      if (nonce) {
        const signature = await signer?.signMessage(nonce);
        console.log(signature);

        if (signature) {
          // // Send the signed message to your backend for verification
          const response = await axios.post(
            'https://smcc99.com/api/auth/verify',
            {
              address,
              signature: signature,
              nonce,
            }
          );
          console.log('token', response.data.token);
          sessionStorage.setItem('ddhcnvK2', response.data.token);
          console.log(response.data.user);
          sessionStorage.setItem('auth', response.data.user);
        }
      }
    }
  }

  useEffect(() => {
    if (hasRun === true) {
      console.log('isConnected updated:', isConnected);
      onSignMessage();
    }
  }, [hasRun]);

  async function onSignOut() {
    await disconnect();

    sessionStorage.removeItem('ddhcnvK2');
    sessionStorage.removeItem('auth');
  }

  return (
    <div className={className}>
      {/* <BlueButton
        text={`${t("connect_wallet")}`}
        innerClassName={`text-xl ${innerClassName}`}
        outerClassName={`${outerClassName}`}
        onClick={handleWalletModalClick}
      /> */}

      <BlueButton
        text={
          isConnected
            ? `${address.substring(0, 6)}...${address.substring(
                address.length - 4
              )}`
            : `${t('connect_wallet')}`
        }
        innerClassName={`text-xl ${innerClassName}`}
        outerClassName={`${outerClassName}`}
        onClick={() => {
          if (isConnected) {
            onSignOut();
            setHasRun(false);
          } else {
            open({
              headers: {
                'x-project-id': 'd4b4ea4d0b9e81094db8e4fd59a8eb87',
                'x-sdk-type': 'Appkit',
                'x-sdk-version': 'react-ethers-1.5.3',
              },
            });
            setHasRun(true);
          }
        }}
      />

      {/* {modalOpen && <WalletModal onclose={closeWalletModal} />} */}
    </div>
  );
};

export { PurpleButton, BlueButton, CloseButton, ConnectWallet };
