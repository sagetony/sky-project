import { Link } from 'react-router-dom';

const Guide = () => {
  return (
    <div
      className='md:mx-20 md:p-10 my-20 mb-20 md:px-12 p-5 shadow-btns font-inter rounded-xl bg-login'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <h4 className='text-xl text-[#FFD25D] font-bold mb-1'>More question？</h4>
      <h3 className='text-white font-extrabold mb-10 text-3xl md:text-4xl'>
        We are happy to help
      </h3>
      <div className='flex flex-col md:gap-20 gap-10 md:flex-row justify-center'>
        <Link className='md:w-1/3 w-full hover:bg-white hover:text-blue-950  text-center border-[2px] p-3 px-20 font-semibold text-xl text-white border-white rounded-full'>
          <p>User Guide</p>
        </Link>
        <Link
          className='md:w-1/3 w-full hover:bg-white hover:text-blue-950  text-center border-[2px] p-3 px-20 font-semibold text-xl text-white border-white rounded-full'
          to='/help-center'
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <p>Help Center</p>
        </Link>
      </div>
    </div>
  );
};

export default Guide;
