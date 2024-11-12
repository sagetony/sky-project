/* eslint-disable react/no-unescaped-entities */
import { City_Logo, Cloud1, Cloud2, Cloud3, login_bg } from '../../assets';
import { BlueButton } from '../../components';
const Login = () => {
  return (
    <div
      className=' pt-20 bg-center relative'
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className='flex lg:flex-row flex-col-reverse lg:min-h-[110vh]   mx-20 gap-16 lg:gap-20 py-10 justify-around'>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-20 left-0 blur-sm z-0 w-48 animate-upAndDown'
        />{' '}
        <div className='bg-login text-white z-20 h-fit lg:w-[50%] rounded-xl p-6'>
          <div className='text-center'>
            <h3 className='font-itim text-3xl mb-14'>
              Welcome back to the metaverse
            </h3>
            <form action=''>
              <input
                type='text'
                className='block w-full placeholder:text-white text-white text-lg my-5 border-2 border-white rounded-md p-5 py-2 bg-[#1B85ED]'
                placeholder='Email or username'
              />
              <input
                type='text'
                className='block w-full placeholder:text-white text-white text-lg my-5 mb-3 border-2 border-white rounded-md p-5 py-2 bg-[#1B85ED]'
                placeholder='Password'
              />
              <BlueButton
                text='Log in'
                outerClassName='my-6 mb-1 py-0'
                innerClassName='py-0 text-[16px] '
              />
            </form>
            <p className='text-[#44C7FF] my-2'>Forgot password ?</p>
            <div className='flex items-center gap-2'>
              <div className='flex-grow border-t border-white'></div>
              <span className='text-white font-medium'>or</span>
              <div className='flex-grow border-t border-white'></div>
            </div>
            <BlueButton
              text='Continue with wallet'
              outerClassName='bg-none shadow-none my-16 py-0'
              innerClassName='text-[16px] py-0'
            />
          </div>
          <p>
            Don't have an account yet? <span>Create account</span>{' '}
          </p>
        </div>
        <div className='lg:w-1/3 lg:block flex items-center justify-center flex-col'>
          {' '}
          <div className=' animate-breathing -mb-20  '>
            <h2 className='font-itim uppercase text-[#FDFFED] text-xl md:text-xl text-center  absolute z-0 md:left-[94px] left-[100px] top-6 '>
              Welcome to
            </h2>
            <img
              src={City_Logo}
              alt=''
              className='md:w-[320px] md:h-[220px] w-[350px] h-[250px]  '
            />
            <h2 className='font-itim uppercase text-[#DFFEFC] text-xl text-center cursor-pointer hover:text-white md:hover:text-3xl hover:left-[70px] absolute z-50 md:left-[70px] left-[75px] bottom-6 '>
              Start adventure
            </h2>
          </div>{' '}
          <h1 className='font-[600] mt-32  font-fredoka text-5xl text-white  tracking-wide drop-shadow-md'>
            Start Your <br />
            <span className='text-4xl  '>Metaverse World</span>
          </h1>
        </div>{' '}
        <img
          src={Cloud2}
          alt=''
          className='absolute top-[560px] blur-sm left-0 w-52 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[480px] blur-sm top-[250px] right-0 w-52 animate-upAndDown'
        />
      </div>
    </div>
  );
};

export default Login;
