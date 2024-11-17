/* eslint-disable react/prop-types */
import { Home_Hero, City_Logo, Cloud1, Cloud2, Cloud3 } from '../../assets';
import { IoMapOutline } from 'react-icons/io5';
import { BsCart2 } from 'react-icons/bs';
import { BlueButton, PurpleButton, Translations } from '../../components';
import { useNavigate } from 'react-router-dom';

const HomeHero = ({ showButtons }) => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <div className=' z-0'>
        <div
          style={{ backgroundImage: `url(${Home_Hero})` }}
          className='md:h-[90vh] h-[100vh] flex items-end justify-center bg-cover md:bg-[0px_-140px] bg-[0px_-0px] bg-no-repeat'
        >
          <div className='md:relative animate-breathing -mb-20  '>
            <h2 className='font-itim uppercase text-[#FDFFED] text-2xl md:text-3xl text-center  absolute z-0 md:left-[104px] left-[100px] top-6 '>
              Welcome to
            </h2>
            <img
              src={City_Logo}
              alt=''
              className='md:w-[400px] md:h-[300px] w-[350px] h-[250px]  '
            />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-2xl text-center cursor-pointer hover:text-white md:hover:text-3xl hover:left-[70px] absolute z-50 md:left-[98px] left-[75px] bottom-6 '>
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
          className='absolute top-[560px] w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[480px] top-[250px] right-0 w-52 animate-upAndDown'
        />
        <div className='bg-blue-gradient md:px-0 px-7  py-20 pb-10'>
          <div className=' md:w-1/3 mx-auto flex flex-col items-center justify-center  '>
            <h1 className='font-[600] mt-5 mb-16 font-fredoka text-5xl text-white  tracking-wide drop-shadow-md'>
              Start Your <br />
              <span className='text-4xl ml-16'>Metaverse World</span>
            </h1>
            {showButtons && (
              <div className='flex  flex-col gap-10   w-full font-gurajada tracking-wide items-center'>
                <BlueButton
                  onClick={() => navigate('/maps')}
                  icon={<IoMapOutline className='w-8 h-8' />}
                  text={<Translations text='map' />}
                />
                <PurpleButton
                  onClick={() => navigate('/market')}
                  icon={<BsCart2 className='w-8 h-8' />}
                  text={<Translations text='market' />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
