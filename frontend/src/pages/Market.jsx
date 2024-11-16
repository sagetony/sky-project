import { buy, Cloud1, Cloud2, Cloud3, rent } from '../assets';
import { MarketCard } from './components';

const Market = () => {
  return (
    <div className='pt-36 bg-pages relative'>
      <div className='absolute inset-0 z-0'>
        <img
          src={Cloud1}
          alt=''
          className='absolute md:top-[450px] top-[200px] left-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[800px] top-[750px] right-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud2}
          alt=''
          className='absolute md:top-[1200px] top-[1300px] left-0 w-64 animate-upAndDown'
        />
      </div>

      <div className='px-5 md:px-20 pb-20 relative z-10'>
        <h2
          className='text-white font-itim  text-3xl mb-1 md:text-4xl'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Explore Land & Estates
        </h2>
        <p
          className='text-slate-300 font-inter font-[400] text-[16px]'
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          Discover Land & Estates and start creating unique Experiences in the
          Metaverse.
        </p>

        <h2
          className='text-white font-itim mt-7 text-2xl mb-1 '
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Land & Estates{' '}
          <span className='f font-inter font-[200] text-sm'>(600)</span>
        </h2>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-6'>
          <MarketCard src={buy} />
          <MarketCard src={rent} />
          <MarketCard src={buy} onSale={true} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
          <MarketCard src={buy} />
        </div>
      </div>
    </div>
  );
};

export default Market;
