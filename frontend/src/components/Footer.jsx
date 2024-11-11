import { instagram, telegram, twitter } from '../assets';

const Footer = () => {
  return (
    <div className='font-itim '>
      <div className='bg-[#2A86E0] text-white py-5 flex justify-evenly items-center px-5 shadow-deep-top'>
        <h3 className='text-[20px]'>FOLLOW US</h3>
        <div className='flex gap-7'>
          <img src={instagram} alt='' className='w-8 rounded-md' />
          <img src={twitter} alt='' className='w-8 rounded-md' />
          <div className='bg-[#32a9dd] rounded-md'>
            <img src={telegram} alt='' className='w-8 rounded-md' />
          </div>
        </div>
        <span className='w-1/3 text-[20px]'>
          18+and Copyright @SKY META CITY
        </span>
      </div>
    </div>
  );
};

export default Footer;
