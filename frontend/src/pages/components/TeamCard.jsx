/* eslint-disable react/prop-types */
const TeamCard = ({ name, title }) => {
  return (
    <div className='bg-[#2B86E0] font-inter rounded-lg p-5 py-10 flex flex-col justify-center font-[300] text-center border-4 border-[#69CBF4]'>
      <img
        src='https://randomuser.me/api/portraits/women/94.jpg'
        alt=''
        className='rounded-full w-1/2 mx-auto'
      />
      <h3 className='my-5 mb-1'>{name}</h3>
      <p className='text-[#FFD25D]'>{title}</p>
    </div>
  );
};

export default TeamCard;
