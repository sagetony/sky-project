import {
  overview1,
  overview2,
  overview3,
  overviewT1,
  overviewT2,
  overviewT3,
} from '../../assets';

/* eslint-disable react/no-unescaped-entities */
const Overview = () => {
  return (
    <div className='bg-content p-16 px-5 text-white'>
      {' '}
      <h2 className='font-[600] font-fredoka text-5xl sm:text-6xl md:text-7xl  text-center tracking-wide drop-shadow-md'>
        Project Overview
      </h2>
      <div className='my-28 flex md:flex-row flex-col gap-20 justify-between'>
        <div className='flex flex-col gap-5 items-center'>
          <img src={overview1} alt='' />
          <img src={overviewT1} alt='' />
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <img src={overview2} alt='' />
          <img src={overviewT2} alt='' />
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <img src={overview3} alt='' />
          <img src={overviewT3} alt='' />
        </div>
      </div>
      <div className='font-itim'>
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
            • At the same time, it will attract domestic and foreign capital and
            promote local economic development and industrial upgrading.
          </li>
        </ul>
        <h4 className='font-[200] text-[20px] mb-2 mt-5'>
          Science and Technology
        </h4>
        <ul>
          <li className='font-[100] text-[18px]'>
            • Through the research and development and innovation of big data,
            blockchain and AI as well as the global technical exchange, the C99
            Science and Technology Zone can introduce international advanced
            technology and experience to the local area, and promote knowledge
            transfer and technology diffusion.
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
            for construction to be sourced from nearby sources without the need
            to transport soil and sand long distances, which reduces the
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
  );
};

export default Overview;
