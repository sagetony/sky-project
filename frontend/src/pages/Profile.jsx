import { Cloud1, Cloud2, Cloud3, User } from '../assets';
import { BlueButton, Icons } from '../components';

const Profile = () => {
  return (
    <div className='pt-36 bg-pages relative'>
      <div className='absolute inset-0 z-0'>
        <img
          src={Cloud1}
          alt=''
          className='absolute md:top-[350px] top-[100px] left-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud3}
          alt=''
          className='absolute md:top-[700px] top-[650px] right-0 w-64 animate-upAndDown'
        />
        <img
          src={Cloud2}
          alt=''
          className='absolute md:top-[1100px] top-[1200px] left-0 w-64 animate-upAndDown'
        />
      </div>

      <div className='px-5 md:px-20 pb-20 relative z-10'>
        <h2
          className='text-white font-itim  text-3xl mb-1 md:text-4xl'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Profile
        </h2>
        <p
          className='text-slate-300 font-inter font-[400] text-[16px]'
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          Share a little bit about yourself in the metaverse!
        </p>
        <div className=' b font-itim text-white bg-login flex items-center justify-center h-[200px] mt-5 rounded-md'>
          <p className='opacity-60 text-xl'>Upload banner</p>
        </div>
        <div className='bg-login mt-10 rounded-md px-32 py-8'>
          <div className='flex justify-between items-center'>
            <div className='bg-[#104C86] border-2 p-2 border-white rounded-md'>
              <img src={User} alt='' />
            </div>
            <div className=' w-1/4'>
              <div className='flex items-start gap-4 '>
                <BlueButton text={`Save`} innerClassName={`text-sm`} />
                <BlueButton
                  text={`Cancel`}
                  innerClassName={`text-sm`}
                  outerClassName={`bg-none`}
                />
              </div>
              <p className='flex font-inter text-white opacity-80 gap-2 items-center justify-center mt-5'>
                <Icons icon='tabler:eye' className='md:text-2xl text-xl ' />
                View Profile
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
