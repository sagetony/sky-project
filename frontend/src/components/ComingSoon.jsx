/* eslint-disable react/no-unescaped-entities */
import { close, platform } from '../assets';

/* eslint-disable react/prop-types */
const ComingSoon = ({ onclose }) => {
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };

  return (
    <div
      className='fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-50 top-0 left-0'
      onClick={handleModalOverlayClick}
    >
      <div className='bg-[#002B5E] md:max-h-[450px] max-h-[600px] overflow-auto text-white border border-slate-300 rounded-lg p-5 h-full md:h-[75%] w-full md:w-1/2'>
        <div className='h-full'>
          <div className='flex justify-end'>
            <img
              src={close}
              onClick={onclose}
              className=' cursor-pointer w-8'
            />
          </div>{' '}
          <div className='flex items-center justify-center flex-col'>
            <img
              src={platform}
              className='w-48 h-48'
              data-aos='zoom-in'
              data-aos-duration='1000'
            />
            <h4
              className='text-2xl font-[600]'
              data-aos='zoom-in'
              data-aos-duration='1000'
            >
              Coming soon
            </h4>
            <p
              className='font-[300] text-center mt-4'
              data-aos='zoom-in'
              data-aos-duration='1000'
            >
              Something amazing is on its way! <br />
              We're working hard to bring you an incredible experience. Stay
              tuned and be the first to know when we launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
