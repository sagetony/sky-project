import { Cloud1, Cloud2, Cloud3, login_bg } from '../../assets';
import { BlueButton } from './Button';

const MintingForm = () => {
  return (
    <div
      className=' pt-20 bg-center relative'
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className='flex flex-col-reverse lg:min-h-[110vh] lg:mx-20 gap-16 lg:gap-20 py-10 justify-center'>
        <img
          src={Cloud1}
          alt=''
          className='absolute top-20 left-0 blur-sm z-0 w-48 animate-upAndDown'
        />{' '}
        <div className='bg-login mt-14 md:w-1/2 sm:w-2/3 sm:mx-auto mx-5 rounded-[50px] text-white z-20 h-fit p-7 px-16 shadow-card'>
          <div className='text-center'>
            <h3 className='font-itim text-3xl mb-8'>Minting form</h3>
            <div className='px-8'>
              <form action=''>
                <input
                  type='text'
                  name='text'
                  className={`block w-full placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px] mt-5 border-2  rounded-md p-5 py-2 bg-[#1B85ED]
                    `}
                />

                <div className='relative'>
                  <input
                    name='Text'
                    className={`block w-full placeholder:text-white focus:ring-4 ring-[#44C7FF] outline-none text-white text-[15px]  border-2  rounded-md p-5 py-2 bg-[#1B85ED] `}
                    placeholder='Text'
                  />
                </div>

                <BlueButton
                  loadText='Getting access...'
                  text='Submit'
                  outerClassName='my-6 mb-1 py-0'
                  innerClassName='py-0 text-sm '
                />
              </form>
            </div>
          </div>
        </div>
        <img
          src={Cloud2}
          alt=''
          className='absolute top-[700px] md:top-[560px] blur-sm left-0 w-52 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[480px] blur-sm top-[350px] right-0 w-52 animate-upAndDown'
        />
      </div>
    </div>
  );
};

export default MintingForm;
