import { Home_Hero, City_Logo, Cloud1, Cloud2, Cloud3 } from '../../assets';
import { IoMapOutline } from 'react-icons/io5';
import { BsCart2 } from 'react-icons/bs';
import { BlueButton, PurpleButton, Translations } from '../../components';

const HomeHero = () => {
  return (
    <div className=''>
      <div className=' z-0'>
        <div
          style={{ backgroundImage: `url(${Home_Hero})` }}
          className='h-[90vh] flex items-end justify-center bg-cover bg-[0px_-140px] bg-no-repeat'
        >
          <div className='relative animate-breathing md:-mb-20 -mb-0'>
            <h2 className='font-itim uppercase text-[#FDFFED] text-3xl text-center  absolute z-0 left-[104px] top-6 '>
              Welcome to
            </h2>
            <img
              src={City_Logo}
              alt=''
              className='md:w-[400px] md:h-[300px] w-[200px] h-[150px]  '
            />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-2xl text-center cursor-pointer hover:text-white hover:text-3xl hover:left-[70px] absolute z-50 left-[98px] bottom-6 '>
              Start adventure
            </h2>
          </div>
        </div>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-20 z-0 w-48 animate-upAndDown'
        />
        <img
          src={Cloud2}
          alt=''
          className='absolute top-[540px] w-48 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute top-[480px] right-0 w-48 animate-upAndDown'
        />
        <div className='bg-blue-gradient   py-20 pb-10'>
          <div className=' w-1/3 mx-auto flex flex-col items-center justify-center  '>
            <h1 className='font-[600] mt-5 font-fredoka text-5xl text-white  tracking-wide drop-shadow-md'>
              Start Your <br />
              <span className='text-4xl ml-16'>Metaverse World</span>
            </h1>
            <div className='flex  flex-col gap-10 mt-16 w-full font-gurajada tracking-wide items-center'>
              <BlueButton
                icon={<IoMapOutline className='w-8 h-8' />}
                text={<Translations text='map' />}
              />
              <PurpleButton
                icon={<BsCart2 className='w-8 h-8' />}
                text={<Translations text='market' />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
