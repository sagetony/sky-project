import { Link } from 'react-router-dom';
import {
  Cloud1,
  Cloud2,
  Cloud3,
  overview1,
  overview2,
  overview3,
  overviewT1,
  overviewT2,
  overviewT3,
  points,
} from '../../assets';
import { Translations } from '../../components';

/* eslint-disable react/no-unescaped-entities */
const Overview = () => {
  return (
    <div className='bg-content relative p-16 px-5 md:px-28 text-white'>
      <div className='absolute inset-0 z-0'>
        <img
          src={Cloud1}
          alt=''
          className='absolute md:top-[450px] top-[300px] left-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud2}
          alt=''
          className='absolute md:top-[1200px] top-[2900px] left-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[800px] top-[1600px] right-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[1600px] top-[3500px] right-0 w-64 animate-upAndDown'
        />
      </div>{' '}
      <div className='z-10 relative'>
        <h2 className='font-[600] font-fredoka text-5xl sm:text-6xl md:text-7xl  text-center tracking-wide drop-shadow-md'>
          <Translations text='project_overview' />
        </h2>
        <div className='flex md:flex-row flex-col-reverse justify-between gap-16'>
          <div className='md:w-1/3'>
            <div className='mb-20'>
              <h3 className='font-itim text-2xl'>
                <Translations text='position' />
              </h3>
              <p>
                <Translations text='position_info' />
              </p>
            </div>
            <div>
              <h3 className='font-itim text-2xl'>
                <Translations text='surroundings' />
              </h3>
              <p>
                <Translations text='surroundings_info' />
              </p>
            </div>
          </div>
          <div className='md:w-2/3 flex justify-center flex-col'>
            <img src={points} alt='' />
            <span className='shadow-card border-[5px] border-white rounded-full bg-mapsbtn md:mt-0 mt-8 md:w-[450px] text-center font-[300] mx-auto px-10 py-5 font-inter'>
              <Translations text='official_button' />{' '}
            </span>
          </div>
        </div>
        <div className='my-28 flex md:flex-row flex-col gap-20 justify-between'>
          <div className='flex flex-col gap-5 items-center'>
            <img src={overview1} alt='' />
            <Link to='/about'>
              <img src={overviewT1} alt='' />
            </Link>
          </div>
          <div className='flex flex-col gap-5 items-center'>
            <img src={overview2} alt='' />
            <Link to='/city-fund'>
              <img src={overviewT2} alt='' />
            </Link>
          </div>
          <div className='flex flex-col gap-5 items-center'>
            <img src={overview3} alt='' />
            <img src={overviewT3} alt='' />
          </div>
        </div>
        <div className='font-itim bg-card rounded-[100px] border-[5px] border-white p-10 py-20'>
          <h3 className='font-[200] text-[30px]'>
            {' '}
            <Translations text='social_responsibility' />
          </h3>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            {' '}
            <Translations text='employment' />
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • <Translations text='employment_info' />
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            <Translations text='finance' />
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • <Translations text='finance_info_1' />
            </li>
            <li className='font-[100] text-[18px]'>
              • <Translations text='finance_info_2' />
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            <Translations text='science_and_technology' />
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • <Translations text='science_and_technology_info' />
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            <Translations text='education' />
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • <Translations text='education_info' />
            </li>
          </ul>

          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            <Translations text='environmental_protection' />
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • <Translations text='environmental_protection_info_1' />
            </li>
            <li className='font-[100] text-[18px]'>
              • <Translations text='environmental_protection_info_2' />
            </li>
            <li className='font-[100] text-[18px]'>
              • <Translations text='environmental_protection_info_3' />
            </li>
            <li className='font-[100] text-[18px]'>
              • <Translations text='environmental_protection_info_4' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
