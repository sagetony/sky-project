/* eslint-disable react/prop-types */
import { market, onsale, pin } from '../../assets';

const MarketCard = ({ src, onSale }) => {
  return (
    <div className='p-4 hover:shadow-2xl relative bg-card rounded-2xl hover:bg-none hover:bg-slate-100 cursor-pointer hover:text-[#2A86E0] text-white font-inter'>
      <h4 className='font-bold flex items-center gap-3'>
        LAND#00000{' '}
        <span>
          <img src={pin} alt='' className='w-4' />
        </span>
      </h4>
      {onSale && (
        <img src={onsale} className='a absolute w-[80px] -right-6 top-16' />
      )}
      <p className='text-[12px]'>-53,-144</p>
      <img src={market} className='my-5 w-full' alt='' />
      <img src={src} alt='' className='p hover:shadow-xl cursor-pointer ' />
    </div>
  );
};

export default MarketCard;
