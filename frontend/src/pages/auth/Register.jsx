import { City_Logo, Cloud1, Cloud2, Cloud3, login_bg } from '../../assets';
import { ConnectWallet } from '../../components';

const Register = () => {
  return (
    <div
      className=' pt-20 bg-center relative'
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className='flex flex-col-reverse lg:min-h-[80vh] lg:mx-20  gap-10 py-10 justify-center'>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-[10vh] left-0 blur-sm z-0 w-48 animate-upAndDown'
        />{' '}
        <div className='bg-login mt -14  sm:w-4/5 md:w-3/5 lg:w-2/5 w-4/5 mx-auto mx- 5 rounded-[50px] text-white z-20 h-fit p-7 px-16 shadow-card'>
          <div className='text-center'>
            <h3 className='font-itim text-3xl mb-8'>
              Welcome back to the metaverse
            </h3>
            <div className='px-8'>
              <form action=''>
                {/* <BlueButton
                  onClick={handleSubmit}
                  loading={loading}
                  loadText='Getting access...'
                  text='Connect wallet'
                  outerClassName='my-0 mb-1 py-0'
                  innerClassName='py-0 text-xl '
                /> */}
                <ConnectWallet />
              </form>
            </div>
          </div>
        </div>
        <div className='flex z-30 items-center justify-center flex-col'>
          {' '}
          <div className=' animate-breathing -mb -20  '>
            <h2 className='font-itim uppercase text-[#FDFFED] text-xl md:text-xl text-center  absolute z-0 left-[110px]  top-6 '>
              Welcome to
            </h2>
            <img src={City_Logo} alt='' className='  w-[355px] h-[260px]  ' />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-xl text-center cursor-pointer hover:text-white md:hover:text-3xl hover:left-[4vw] absolute z-50  left-[90px] bottom-6 '>
              Start adventure
            </h2>
          </div>{' '}
        </div>{' '}
        <img
          src={Cloud2}
          alt=''
          className='absolute  top-[75vh] blur-sm left-0 w-52 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute  top-[40vh] blur-sm  right-0 w-52 animate-upAndDown'
        />
      </div>
    </div>
  );
};

export default Register;
