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
          Project Overview
        </h2>
        <div className='flex md:flex-row flex-col-reverse justify-between gap-16'>
          <div className='md:w-1/3'>
            <div className='mb-20'>
              <h3 className='font-itim text-2xl'>Position</h3>
              <p>
                The project is located in Sihanoukville, Sihanoukville,
                Cambodia, about 20 kilometers away from Sihanoukville City (West
                Port). Sihanoukville is Cambodia's only special economic zone
                and the country's largest deep water port
              </p>
            </div>
            <div>
              <h3 className='font-itim text-2xl'>Surroundings</h3>
              <p>
                The project is surrounded by magnificent mangrove scenery, which
                not only enhances the ecological quality of the project, It also
                provides abundant resources for landscape development.
              </p>
            </div>
          </div>
          <div className='md:w-2/3 flex justify-center flex-col'>
            <img src={points} alt='' />
            <span className='shadow-card border-[5px] border-white rounded-full bg-mapsbtn md:mt-0 mt-8 md:w-[450px] text-center font-[300] mx-auto px-10 py-5 font-inter'>
              Official website Hundred book trading market 100 hectares pre-sale
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
          <h3 className='font-[200] text-[30px]'>Social responsibility</h3>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>Employment </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • C99 Meta City will directly create a large number of jobs across
              all levels and skill levels, from blue-collar workers to high-tech
              R&D personnel.{' '}
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>Finance</h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • The C99 Meta City project financial district offers diversified
              financial products and services to meet the financial needs of
              enterprises and individuals and promote the development of the
              financial market.
            </li>
            <li className='font-[100] text-[18px]'>
              • At the same time, it will attract domestic and foreign capital
              and promote local economic development and industrial upgrading.
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            Science and Technology
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • Through the research and development and innovation of big data,
              blockchain and AI as well as the global technical exchange, the
              C99 Science and Technology Zone can introduce international
              advanced technology and experience to the local area, and promote
              knowledge transfer and technology diffusion.
            </li>
          </ul>
          <h4 className='font-[200] text-[20px] mb-2 mt-5'>Education</h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • The project will introduce international education resources and
              advanced education concepts to Cambodia, provide international
              education opportunities, enhance students' global vision and
              competitiveness, and improve the overall education level.
            </li>
          </ul>

          <h4 className='font-[200] text-[20px] mb-2 mt-5'>
            Environmental protection
          </h4>
          <ul>
            <li className='font-[100] text-[18px]'>
              • The unique geographical location of the project allows materials
              for construction to be sourced from nearby sources without the
              need to transport soil and sand long distances, which reduces the
              dependence on external resources and reduces the environmental
              impact.
            </li>
            <li className='font-[100] text-[18px]'>
              • The mangroves surrounding the project help regulate the climate
              and protect the shoreline, maintaining the stability of the
              surrounding natural environment.
            </li>
            <li className='font-[100] text-[18px]'>
              • The project supports the development of green industries and
              environmental protection technologies, builds a sustainable
              industrial chain, and promotes the development of green economy.
            </li>
            <li className='font-[100] text-[18px]'>
              • Garbage sorting will be implemented within C99 Meta City and a
              recycling system will be established to minimize environmental
              pollution
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
