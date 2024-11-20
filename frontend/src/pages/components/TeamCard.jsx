/* eslint-disable react/prop-types */
const TeamCard = ({ name, title }) => {
  return (
    <div className=' font-inter rounded-lg flex flex-col justify-center font-[300] text-center'>
      <img
        src='https://randomuser.me/api/portraits/women/94.jpg'
        alt=''
        className='rounded-full w-1/2 mx-auto border-[3px] border-white'
      />
      <div className='bg-[#2B86E0] mt-5 p-3 rounded-lg border-[3px] border-white'>
        <h3 className=' font-itim'>{name}</h3>
        <p className='text-[#FFD25D] font-inter text-xl font-[500]'>{title}</p>
      </div>
    </div>
  );
};

export default TeamCard;
