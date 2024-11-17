import { Cloud1, map_inner, maps_bg } from '../../assets';
import MapCard from './MapCard';

const MapSection = () => {
  return (
    <div className='relative' style={{ backgroundImage: `url(${maps_bg})` }}>
      {' '}
      <div className='absolute inset-0 z-0'>
        {/* <h1 className='text-[200px]'>khbj</h1> */}
        <img
          src={Cloud1}
          alt=''
          className='absolute -top-12 left-0 w-96 animate-upAndDown'
        />
      </div>
      <div className='font-inter relative z-10 pt-10 py-20 px-10'>
        <div className='flex justify-end'>
          <input
            type='text'
            placeholder='Search an experience'
            className='border-2 md:w-1/3 w-full mb-3 border-white bg-[#1B85ED] text-white placeholder:text-slate-100 px-5 py-2 rounded-md'
          />
        </div>
        <div className='flex md:flex-row flex-col gap-10 justify-between'>
          <div className='md:w-2/3'>
            <img src={map_inner} alt='' className='' />
          </div>
          <div
            className='o md:overflow-auto md:h-[790px]'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#1B85ED white',
            }}
          >
            <div className='grid gap-5 md:px-8'>
              <MapCard isTag={true} />
              <MapCard isCreator={true} />
              <MapCard isMeta={true} />
              <MapCard />
              <MapCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
