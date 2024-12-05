import { useState } from 'react';
import { gcal, tether } from '../../assets';
import { BlueButton, ConnectWallet } from '../../components';

const StakeCard = () => {
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('30d');

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleStakeModalClick = () => {
    setModalOpen2(!modalOpen2);
  };

  return (
    <div>
      <div className='bg-login hover:ring-2 text-white p-6 py-6 md:py-3 sm:px-16 flex lg:flex-row flex-col lg:items-center justify-between rounded-[50px] mb-5 cursor-pointer shadow-cards1'>
        <div className='flex flex-col lg:items-center'>
          <img src={tether} className='w-[100px] rounded-full' />
          <p className=' mt-1 font-itim text-2xl'>Cryto Name</p>
          <p className='font-[300] text-sm opacity-50'>Stake & Earn</p>
        </div>
        <div className='lg:w-[20%] w-full lg:my-0 my-7'>
          <p className='font-itim text-xl mb-2'>Stake period:</p>
          <div className='flex gap-2 mb-2 border-2 justify-between border-white rounded-lg p-2 py-1'>
            <button
              className={`rounded-md lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === '30d'
                  ? 'bg-[#2A86E0] text-white '
                  : 'bg-transparent  text-slate-300'
              }`}
              onClick={() => handleSelect('30d')}
            >
              30D
            </button>{' '}
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === '60d'
                  ? 'bg-[#2A86E0] text-white '
                  : 'bg-transparent  text-slate-300'
              }`}
              onClick={() => handleSelect('60d')}
            >
              60D
            </button>
            <button
              className={`rounded-md  lg:w-fit w-full  p-1 px-3 text-sm text-gray6 ${
                selectedPurpose === '90d'
                  ? 'bg-[#2A86E0] text-white '
                  : 'bg-transparent   text-slate-300'
              }`}
              onClick={() => handleSelect('90d')}
            >
              90D
            </button>{' '}
          </div>
        </div>
        <div className='lg:w-[20%] w-full lg:mb-0 mb-9 lg:text-center'>
          <p className='font-itim text-xl mb-1'>Total Staked:</p>
          <p className='font[300] font-inter lg:text-right text-slate-200'>
            27587.7 Crypto Name
          </p>
          <p className='text-slate-300 text-sm opacity-50 lg:text-right font-inter font-[200]'>
            ~12345$ usd
          </p>
        </div>
        <div className='flex lg:mb-0 mb-14 lg:items-center flex-col'>
          <p className='font-itim text-xl'>APR:</p>
          <div className='flex items-center gap-2'>
            <p className='text-[16px] text-slate-300'>
              {selectedPurpose === '30d'
                ? '8%~10%'
                : selectedPurpose === '60d'
                ? '13%~15%'
                : selectedPurpose === '90d'
                ? '18%~20%'
                : selectedPurpose === '180d'
                ? '48%~50%'
                : selectedPurpose === '360d'
                ? '98%~100%'
                : selectedPurpose === '720d'
                ? '298%~300%'
                : null}{' '}
            </p>{' '}
            <img
              src={gcal}
              className='w-5 h-5'
              onClick={handleStakeModalClick}
            />
          </div>
        </div>
        <div className='lg:w-[25%] w-full flex flex-col justify-center lg:items-center'>
          <ConnectWallet className={` w-full font-bold font-inter`} />
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
