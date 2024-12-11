import { useState } from 'react';
import { Coin_bag, purchase, staking, coins } from '../../assets';
import { BlueButton, PurpleButton, Translations } from '../../components';
import { LuExternalLink } from 'react-icons/lu';
import { cards } from '../../data/data';
import { useNavigate } from 'react-router-dom';

const Tokenomics = () => {
  const navigate = useNavigate();
  const [currentBatch, setCurrentBatch] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const batchSize = 4;
  const totalBatches = Math.ceil(cards.length);

  const handleNext = () => {
    if (currentBatch < totalBatches - 1) {
      setSlideDirection('right');
      setCurrentBatch(currentBatch + 1);
    }
  };

  const handlePrevious = () => {
    if (currentBatch > 0) {
      setSlideDirection('left');
      setCurrentBatch(currentBatch - 1);
    }
  };

  const renderCards = () => {
    if (currentBatch === 0) {
      return (
        <div
          className={`grid gap-5 md:grid-cols-2 lg:grid-cols-4 ${
            slideDirection === 'right'
              ? 'animate-slide-in-right'
              : 'animate-slide-in-left'
          }`}
        >
          {cards.slice(0, batchSize).map((card, index) => (
            <div
              key={index}
              className='bg-card border-[5px] rounded-[70px] border-[#F9F9F4] p-5 pt-10 text-center px-7 shadow-card pb-10'
            >
              <h3 className='font-itim text-2xl text-center font-[300] mb-7'>
                <Translations text={card.title} />
              </h3>
              <p className='font-[300]'>
                {' '}
                <Translations text={card.description} />
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (currentBatch === 1) {
      const secondBatch = cards[4];
      return (
        <div
          className={`bg-card border-[5px] rounded-[70px] border-[#F9F9F4] p-10 shadow-card ${
            slideDirection === 'right'
              ? 'animate-slide-in-right'
              : 'animate-slide-in-left'
          }`}
        >
          <ul className='list-disc list-inside space-y-4'>
            {secondBatch.map((item, index) => (
              <li key={index} className='font-[300] text-lg'>
                <Translations text={item.description} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className='bg-[#68cdf4] py-16 relative' id='tokenomics'>
      <img
        src={coins}
        alt=''
        className='absolute animate-upAndDown z-10 xl:-top-72 lg:-top-64'
      />
      <div className='flex z-20 justify-between lg:flex-row flex-col-reverse items-center gap-10 lg:px-20 px-7 lg:pl-28'>
        <div className='md:w-1/2 w-full'>
          <h2 className='font-[600] font-fredoka text-6xl sm:text-7xl lg:text-8xl text-center text-white tracking-wide drop-shadow-md'>
            <Translations text='tokenomics' />
          </h2>{' '}
          <div className='flex z-30 flex-col gap-5 mt-10 md:w-4/5 mx-auto font-gurajada tracking-[0.25em] items-center'>
            <BlueButton
              outerClassName={`z-20`}
              icon={<img src={purchase} className='w-8 h-8 ' />}
              text={<Translations text='token_purchase' />}
              onClick={() => navigate('/purchase')}
            />
            <PurpleButton
              outerClassName={`z-20`}
              icon={<img src={staking} className='w-8 h-8' />}
              text={<Translations text='token_staking' />}
              onClick={() => navigate('/staking')}
            />
            <button className='text-white font-itim tracking-widest text-xl border-2 border-white p-1 px-5 hover:bg-white hover:text-[#1e90ff] rounded-md'>
              <span className='flex items-center justify-center gap-3'>
                <Translations text='whitepaper' /> <LuExternalLink />
              </span>
            </button>
          </div>
        </div>
        <img src={Coin_bag} alt='' className='md:w-[400px] w-[200px]' />
      </div>
      <div className='px-5 text-white font-inter md:mt-48 mt-36'>
        <div className='bg-[#2A86E0] rounded-lg shadow-section'>
          <h2 className='p-5 px-7 font-[900] text-2xl'>
            {' '}
            <Translations text='what_is_sms_token' />?
          </h2>
          <div className='py-10 pb-5 px-5 rounded-b-lg bg-white'>
            {renderCards()}
            <div className='lg:mt-24 mt-10 flex items-center justify-center gap-5'>
              <button
                onClick={handlePrevious}
                disabled={currentBatch === 0}
                className={`rounded-md w-24 p-2 py-[10px] ${
                  currentBatch === 0
                    ? 'bg-[#D9D9D9] opacity-50 cursor-not-allowed'
                    : ' bg-[#69CCF4]'
                }`}
              ></button>
              <button
                onClick={handleNext}
                disabled={currentBatch === totalBatches - 1}
                className={`rounded-md w-24 p-2 py-[10px] ${
                  currentBatch === 1
                    ? 'bg-[#D9D9D9] opacity-50 cursor-not-allowed'
                    : ' bg-[#69CCF4]'
                }`}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
