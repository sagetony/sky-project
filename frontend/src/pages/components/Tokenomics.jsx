import { useState } from 'react';
import { Coin_bag, purchase, staking } from '../../assets';
import { BlueButton, PurpleButton, Translations } from '../../components';
import { LuExternalLink } from 'react-icons/lu';

const Tokenomics = () => {
  const [currentBatch, setCurrentBatch] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const cards = [
    {
      title: 'Token properties',
      description:
        'CMC is a governance token issued by C99 MetaCity that can be used to trade NFT land, develop and build land, participate in economic activities, financial settlement, investment, etc.',
    },
    {
      title: 'How to get it',
      description:
        'Pledge, purchase, community governance incentives, participation in economic activities, etc.',
    },
    {
      title: 'Community governance',
      description:
        'With CMC tokens and NFT, users become community managers who vote to recommend project development and urban planning.',
    },
    {
      title: 'Multiple applications',
      description:
        'CMC tokens can be used in C99 MetaCity in the future for consumption or payment of related expenses, such as food, shopping, entertainment, medical care, education, life, payment of land-related expenses, electricity and water bills, and other infrastructure use.',
    },
    {
      title: 'Token properties 2',
      description:
        'CMC is a governance token issued by C99 MetaCity that can be used to trade NFT land, develop and build land, participate in economic activities, financial settlement, investment, etc.',
    },
    {
      title: 'How to get it 2',
      description:
        'Pledge, purchase, community governance incentives, participation in economic activities, etc.',
    },
    {
      title: 'Community governance 2',
      description:
        'With CMC tokens and NFT, users become community managers who vote to recommend project development and urban planning.',
    },
    {
      title: 'Multiple applications 2',
      description:
        'CMC tokens can be used in C99 MetaCity in the future for consumption or payment of related expenses, such as food, shopping, entertainment, medical care, education, life, payment of land-related expenses, electricity and water bills, and other infrastructure use.',
    },
  ];

  const batchSize = 4;
  const totalBatches = Math.ceil(cards.length / batchSize);

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

  const getCurrentCards = () => {
    const startIndex = currentBatch * batchSize;
    return cards.slice(startIndex, startIndex + batchSize);
  };

  return (
    <div className='bg-[#68cdf4] py-16  '>
      <div className='flex justify-between md:flex-row flex-col-reverse items-center gap-10 md:px-20 px-7 md:pl-28'>
        <div className='md:w-1/2 w-full'>
          <h2 className='font-[600] font-fredoka text-6xl sm:text-7xl md:text-8xl text-center text-white  tracking-wide drop-shadow-md'>
            <Translations text='tokenomics' />
          </h2>
          <div className='flex  flex-col gap-5 mt-10 md:w-4/5 mx-auto font-gurajada tracking-[0.25em] items-center'>
            <BlueButton
              icon={<img src={purchase} className='w-8 h-8' />}
              text={'Token purchase'}
            />
            <PurpleButton
              icon={<img src={staking} className='w-8 h-8' />}
              text='Token staking'
            />
            <button className='text-white font-itim tracking-widest text-xl border-2 border-white p-1 px-5 hover:bg-white hover:text-[#1e90ff] rounded-md'>
              <span className='flex items-center justify-center gap-3'>
                Whitepaper <LuExternalLink />
              </span>
            </button>
          </div>
        </div>
        <img src={Coin_bag} alt='' className='md:w-[400px] w-[200px]' />{' '}
      </div>
      <div className='px-5 text-white font-inter md:mt-48 mt-36'>
        <div className='bg-[#2A86E0] rounded-lg shadow-section'>
          <h2 className='p-5 px-7 font-[900] text-2xl'>What is CMC Token?</h2>
          <div className='py-10 pb-5 px-5 rounded-b-lg bg-white  '>
            <div
              className={`grid gap-5 md:grid-cols-2 lg:grid-cols-4 ${
                slideDirection === 'right'
                  ? 'animate-slide-in-right'
                  : 'animate-slide-in-left'
              }`}
            >
              {getCurrentCards().map((card, index) => (
                <div
                  key={index}
                  className='bg-card rounded-md p-5 px-7 shadow-card pb-10'
                >
                  <h3 className='font-itim text-2xl text-center font-[400] mb-7'>
                    {card.title}
                  </h3>
                  <p className='font-[300]'>{card.description}</p>
                </div>
              ))}
            </div>
            <div className='lg:mt-24 mt-10 flex items-center justify-center gap-5'>
              <button
                onClick={handlePrevious}
                disabled={currentBatch === 0}
                className={`rounded-md w-24 p-2 py-[10px] ${
                  currentBatch === 0
                    ? 'bg-[#D9D9D9] opacity-50  cursor-not-allowed'
                    : 'hover:bg-[#50afd4] focus:bg-[#69CCF4] bg-[#69CCF4]'
                }`}
              ></button>
              <button
                onClick={handleNext}
                disabled={currentBatch === totalBatches - 1}
                className={`rounded-md w-24 p-2 py-[10px] ${
                  currentBatch === totalBatches - 1
                    ? 'bg-[#D9D9D9] opacity-50  cursor-not-allowed'
                    : 'hover:bg-[#50afd4] focus:bg-[#69CCF4] bg-[#69CCF4]'
                }`}
              ></button>
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
