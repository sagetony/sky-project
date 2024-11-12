import { Logo } from '../assets';
import { FaMap, FaStore, FaCoins, FaInfoCircle, FaGlobe } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isHoveringDropdown) {
      setIsDropdownVisible(false);
    }
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    setIsDropdownVisible(false);
  };

  return (
    <nav className='bg-gradient-to-b fixed w-full shadow-xl z-50 top-0 from-blue-400 to-[#6bccf4] p-2 px-5 flex items-center justify-between space-x-4 text-white'>
      <img src={Logo} alt='Logo' className='w-16 h-16 ' />
      <div className='hidden md:flex justify-between w-0  md:w-1/2 items-center bg-[#2b86e0] rounded-lg shadow-lg px-5 py-3 text-md'>
        <a href='/maps' className='flex items-center space-x-1 '>
          <FaMap />
          <span> {t('map')}</span>
        </a>
        <a href='#market' className='flex items-center space-x-1 '>
          <FaStore />
          <span> {t('market')}</span>
        </a>
        <div className='relative group'>
          <button className='flex items-center space-x-1 '>
            <FaCoins />
            <span> {t('tokenomics')}</span>
            <svg className='w-3 h-3 ml-1 mt-2 group-hover:mt-0 transform group-hover:rotate-180 transition-transform'>
              <path d='M1 1l4 4 4-4' stroke='currentColor' fill='none' />
            </svg>
          </button>
          <div className='absolute left-0 mt-2 p-2 hidden bg-white text-blue-600 shadow-lg rounded group-hover:block'>
            <a href='#option1' className='block px-4 py-2 hover:bg-gray-100'>
              Option 1
            </a>
            <a href='#option2' className='block px-4 py-2 hover:bg-gray-100'>
              Option 2
            </a>
          </div>
        </div>
        <div className='relative group'>
          <button className='flex items-center space-x-1 '>
            <FaInfoCircle />
            <span> {t('about')}</span>
            <svg className='w-3 h-3 ml-1 mt-2 group-hover:mt-0 transform group-hover:rotate-180 transition-transform'>
              <path d='M1 1l4 4 4-4' stroke='currentColor' fill='none' />
            </svg>
          </button>
          <div className='absolute left-0 mt-2 p-2 hidden bg-white text-blue-600 shadow-lg rounded group-hover:block'>
            <a href='#option1' className='block px-4 py-2 hover:bg-gray-100'>
              Option 1
            </a>
            <a href='#option2' className='block px-4 py-2 hover:bg-gray-100'>
              Option 2
            </a>
          </div>
        </div>
      </div>
      <div className='hidden sm:flex items-center md:justify-between justify-end  space-x-2 md:space-x-4 w-2/3 md:w-1/4'>
        <div className='relative group'>
          <button className='flex items-center space-x-1 '>
            <FaGlobe
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsDropdownVisible(true)}
              style={{ fontSize: '25px' }}
              className='group-hover:mt-0 transform group-hover:rotate-180 transition-transform'
            />
          </button>
          {/* Dropdown - Hidden initially */}
          {isDropdownVisible && (
            <div
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              className='absolute overflow-x-auto scroll-smooth scrollbar-hide -left-16 mt-1   w-[150px]  bg-blue-500 text-blue-600 shadow-xl rounded '
            >
              <LanguageSelector setIsDropdownVisible={setIsDropdownVisible} />
            </div>
          )}
        </div>{' '}
        <a href='/login' className='h hover:text-blue-500 hover:font-bold'>
          {t('login')}
        </a>
        <a
          href='#create-account'
          className='  text-white border border-white py-1 hover:ring-2 ring-blue-300 px-4 rounded hover:border-blue-500 hover:bg-blue-500'
        >
          {t('create_account')}
        </a>
      </div>{' '}
      <div className='-mr-2 flex md:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          className=' inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-primary-500   focus:outline-none transition duration-300'
          aria-controls='mobile-menu'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          {/* Icon when menu is closed */}
          {!isOpen ? (
            <svg
              className='block h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          ) : (
            // Icon when menu is open
            <svg
              className='block h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          )}
        </button>
      </div>
      {/* {isOpen && (
        <div className='md:hidden' id='mobile-menu'>
          <div className='border-t mt-5 backdrop-blur-lg pt-2  animate-fade-in'>
            {' '}
            <a
              href='https://wallsprinting.com/'
              onClick={() => setIsOpen(false)}
              className={` block py-2 mt-4 rounded-md text-base font-medium hover:text-primary-500 transition duration-300  mb-4
           
              `}
            >
              Home
            </a>{' '}
            <a
              href='/products-and-services'
              onClick={() => setIsOpen(false)}
              className={` block py-2 mt-4 rounded-md text-base font-medium hover:text-primary-500 transition duration-300  mb-4  `}
            >
              Products & services
            </a>
            <a
              href='/contact-us'
              onClick={() => setIsOpen(false)}
              className={` block py-2 mt-4 rounded-md text-base font-medium hover:text-primary-500 transition duration-300  mb-4  `}
            >
              Contact Us
            </a>{' '}
            <a
              href='/customer-login'
              className='block py-2 rounded-md text-base font-medium hover:text-primary-500 transition duration-300 text-primary-900 '
            >
              <button
                style={{ color: '#DD1E35' }}
                className='text-primary-500  w-full border-neutral-300'
              >
                Customer Login
              </button>
            </a>
            <a
              href='/place-new-order'
              className='block py-2 rounded-md text-base font-medium hover:text-primary-500 transition duration-300 text-primary-900 '
            >
              <button className='w-full'>Place an order</button>
            </a>
          </div>{' '}
        </div>
      )} */}
    </nav>
  );
}
