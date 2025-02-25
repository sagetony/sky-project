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
          className='lg:h-[95vh] md:h-[82vh]  h-[95vh] lg:bg-[0px_20px] flex items-end justify-center bg-center lg:bg-cover lg:bg-[0px_-140px] bg-no-repeat'
        >
          <div className='md:relative animate-breathing -mb-20  '>
            <h2 className='font-itim uppercase text-[#FDFFED] text-2xl md:text-3xl text-center  absolute z-0 md:left-[104px] left-[100px] top-6 '>
              <Translations text='welcome_to' />
            </h2>
            <img
              src={City_Logo}
              alt=''
              className='md:w-[400px] md:h-[300px] w-[350px] h-[250px]  '
            />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-2xl text-center cursor-pointer hover:text-white md:hover:text-3xl hover:left-[70px] absolute z-50 md:left-[98px] left-[75px] bottom-6 '>
              <Translations text='start_adventure' />
            </h2>
          </div>
        </div>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-[10vh] z-0 w-48 animate-upAndDown'
        />
        <img
          src={Cloud2}
          alt=''
          className='absolute top-[85vh] hidden md:block w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[45vh] top-[60vh] right-0 w-52 animate-upAndDown'
        />
        <div className='bg-blue-gradient md:px-0 px-7  py-20 pb-10'>
          <div className=' md:w-1/3 mx-auto flex flex-col items-center justify-center  '>
            <h1 className='font-[600] mt-5 mb-16 font-fredoka text-5xl text-white md:text-left text-center  tracking-wide drop-shadow-md'>
              <Translations text='start_your' />
              <br />
              <span className='text-4xl md:ml-16'>
                <Translations text='metaverse_world' />
              </span>
            </h1>
            {showButtons && (
              <div className='flex z-20  flex-col gap-10   w-full font-gurajada tracking-wide items-center'>
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
