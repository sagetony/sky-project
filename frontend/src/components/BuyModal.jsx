/* eslint-disable react/prop-types */

import { buy_land, close, sales, standard, Star, tags2 } from '../assets';

const BuyLandModal = ({ user, onclose }) => {
  return (
    <div className='fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[999px] top-0 left-0'>
      <div className=' md:max-h-[620px]  [scrollbar-width:none] [--ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[600px] overflow-auto text-white rounded-3xl  w-full lg:w-2/5 md:w-3/4'>
        <div className='bg-login font-inter relative px-8 py-3'>
          <div className='flex justify-end'>
            <img
              src={close}
              onClick={onclose}
              className=' cursor-pointer w-10 hover:opacity-50 '
            />
          </div>
          <img src={sales} className='a absolute right-0 top-20' />
          <img src={standard} className='a absolute right-0 top-32' />
          <img src={tags2} className='a absolute right-0 top-44' />
          <h3 className='text-4xl mb-2'>{user?.description}</h3>
          <p className='lg:w-3/4 font-[400]'>
            We are a team of passionate automotive enthusiasts and experts
            united by a love for vehicle performance and customization. From day
            one, our mission has been to provid...
          </p>
          <p className='text-xl mt-5'>Owner</p>
          <p className='text-[#80FBFF]'>@{user?.name}</p>
          <div className='w-2/3 flex items-center justify-center mx-auto my-10'>
            <img src={user?.image} alt='' className='w-full' />
          </div>
          <div className='grid text-center lg:grid-cols-3'>
            <div>
              <h4 className='font-bold text-xl'>BLOCKCHAIN</h4>
              <p>Polygon</p>
            </div>
            <div>
              <h4 className='font-bold text-xl'>SIZE</h4>
              <p>1 x 1</p>
            </div>
            <div>
              <h4 className='font-bold text-xl'>TOKEN ID</h4>
              <p>{user?.tokenId}</p>
            </div>
          </div>

          <div className=' my-10 cursor-pointer hover:scale-110 ease-linear mx-auto w-2/4'>
            <img src={buy_land} alt='' />
          </div>

          <div>
            <h3 className='font-bold text-xl mb-5'>WHAT CAN I DO WITH LAND?</h3>
            <p className='flex items-center gap-5 font-semibold font-inter mb-7'>
              <span>
                <img src={Star} alt='' className='w-6' />
              </span>
              Start building!
            </p>
            <p className='flex items-center gap-5 font-semibold font-inter mb-7'>
              <span>
                <img src={Star} alt='' className='w-6' />
              </span>
              Publish and monetize your Experience
            </p>
            <p className='flex items-center gap-5 font-semibold font-inter mb-7'>
              <span>
                <img src={Star} alt='' className='w-6' />
              </span>
              Earn special rewards
            </p>
            <p className='flex items-center gap-5 font-semibold font-inter mb-7'>
              <span>
                <img src={Star} alt='' className='w-6' />
              </span>
              Exclusive LAND Owner staking
            </p>
            <p className='flex items-center gap-5 font-semibold font-inter mb-7'>
              <span>
                <img src={Star} alt='' className='w-6' />
              </span>
              Sell your LAND
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyLandModal;
