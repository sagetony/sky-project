import { Coin_bag, purchase, staking } from '../../assets';
import { BlueButton, PurpleButton, Translations } from '../../components';

const Tokenomics = () => {
  return (
    <div className='bg-[#68cdf4] py-16 px-20 pl-28 flex justify-between items-center gap-10'>
      <div className='w-1/2'>
        <h2 className='font-[600] font-fredoka text-8xl text-center text-white  tracking-wide drop-shadow-md'>
          <Translations text='tokenomics' />
        </h2>
        <div className='flex  flex-col gap-10 mt-10 w-2/3 mx-auto font-gurajada tracking-[0.25em] items-center'>
          <BlueButton
            icon={<img src={purchase} className='w-8 h-8' />}
            text={'Token purchase'}
          />
          <PurpleButton
            icon={<img src={staking} className='w-8 h-8' />}
            text='Token staking'
          />
        </div>
      </div>
      <img src={Coin_bag} alt='' className='w-[400px] ' />{' '}
    </div>
  );
};

export default Tokenomics;
