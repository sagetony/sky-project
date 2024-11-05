import { Logo } from '../assets';

const Navbar = () => {
  return (
    <div
      className='p-4 flex justify-between items-center'
      style={{
        background: `linear-gradient(0deg, #6ACCF5, #6ACCF5), 
                 linear-gradient(0deg, rgba(22, 172, 180, 0) 8.33%, rgba(22, 31, 113, 0.2) 97.22%)`,
      }}
    >
      <img src={Logo} alt='Sky Meta City' className='w-16 h-16' />
    </div>
  );
};

export default Navbar;
