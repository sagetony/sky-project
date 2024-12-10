import { CloseButton } from '../components';

const CityFund = () => {
  return (
    <div className='bg-content text-white pt-20'>
      <div className='px-5 py-16 md:pb-32 md:p-10'>
        <div className='md:w-4/5 mx-auto'>
          <CloseButton route={`/`} />
        </div>
        <h2 className=' font-[600] font-fredoka text-6xl sm:text-7xl md:text-8xl text-center tracking-wide drop-shadow-md'>
          Meta City Fund
        </h2>
        <div className='font-itim font-[100] mt-16 my-10 md:w-4/5 mx-auto'>
          <h3 className='text-2xl'>Introduction</h3>
          <p>
            Land less than one thousand square meters is held by Sky fund, and
            can choose fund management and development or investment and
            construction. <span className='i block mb-5'></span>
            Land over 1,000 square meters can be held by itself, in this case,
            we will destroy your on-chain NFT and block the corresponding land
            range in the virtual world, and provide you with a land certificate
            issued by the government for the corresponding land
          </p>
          <h3 className='mt-8 text-2xl'>Advantages</h3>
          <p>
            {' '}
            The Meta City Fund is managed transparently, with all land
            transactions and management recorded on the blockchain to ensure
            openness, transparency and security
            <span className='i block mb-5'></span>
            All assets of the Meta City Fund are subject to supervision openly
            and transparently, fund operations are compliant, and operational
            reports and asset management are regularly released
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityFund;
