/* eslint-disable react/prop-types */
import { creator, meta, pin, tags } from '../../assets';
import { Icons } from '../../components';

const MapCard = ({ isTag, isCreator, isMeta, img, name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='p-5 hover:shadow-2xl relative bg-card border-4 border-white rounded-2xl hover:bg-none hover:bg-slate-100 cursor-pointer hover:text-[#2A86E0] text-white font-inter z-0 hover:border-[#2A86E0]'
    >
      <img src={img} alt='' className='w-full' />
      {(isTag || isCreator || isMeta) && (
        <img
          src={isTag ? tags : isCreator ? creator : isMeta ? meta : null}
          className='a absolute w-[80px] -left-6 top-8'
        />
      )}

      <div className='mt-6 gap-4 flex items-center justify-center'>
        <span className='flex gap-2'>
          <p className=''>{name}</p>
          <img src={pin} className='w-6' alt='' />
        </span>
        <p className='text-[13px] font-[300]'>@game studio page</p>
        <span className='flex items-center'>
          {' '}
          <Icons icon='mdi-light:play' className='md:text-2xl text-xl ' />
          <p>3k</p>{' '}
        </span>
        {/*<img src={src} alt='' className='p hover:shadow-xl cursor-pointer ' /> */}
      </div>
    </div>
  );
};

export default MapCard;
