// /* eslint-disable react-hooks/exhaustive-deps */
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
      <a href='/'>
        <img src={Logo} alt='Logo' className='w-16 h-16 ' />
      </a>
      <div className='hidden md:flex justify-between w-0  md:w-1/2 items-center bg-[#2b86e0] rounded-lg shadow-lg px-5 py-3 text-md'>
        <a href='/maps' className='flex items-center space-x-1 '>
          <FaMap />
          <span> {t('map')}</span>
        </a>
        <a href='/market' className='flex items-center space-x-1 '>
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
// import { Link, useLocation } from 'react-router-dom';
// import { Logo, User } from '../assets';
// import { useEffect, useState } from 'react';
// import styles from './navbar.module.css';
// import ComingSoon from './ComingSoon';

// const Navbar = () => {
//   const [scrolling, setScrolling] = useState(false);
//   const [activeItem, setActiveItem] = useState('home');
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const [dropdown, setDropdown] = useState(null);
//   const [dropdown2, setDropdown2] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
//   const [selected, setSelected] = useState('');

//   const handleComingSoonModalClick = () => {
//     setMobileMenuOpen(false);
//     setModalOpen(!modalOpen);
//   };

//   const closeComingSoonModal = () => {
//     setModalOpen(false);
//   };

//   const handleMouseEnter = (index) => {
//     if (!isMobile && index !== 2) {
//       setDropdown(index);
//     }
//   };

//   const handleMouseEnter2 = () => {
//     if (!isMobile) {
//       setDropdown2(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     setDropdown(null);
//   };

//   const handleMouseLeave2 = () => {
//     setDropdown2(null);
//   };

//   const handleDownload = () => {
//     // const link = document.createElement('a');
//     // link.href = whitepaper;
//     // link.download = 'SeeSeaAI-WhitePaper.pdf';
//     // document.body.appendChild(link);
//     // link.click();
//     // document.body.removeChild(link);
//     // window.open(whitepaper, '_blank');
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setScrolling(true);
//       } else {
//         setScrolling(false);
//       }
//     };

//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 900);
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.addEventListener('resize', handleResize);
//     };
//   }, []);

//   const renderDropdownContent = (item) => {
//     if (isMobile) return null;
//     switch (item) {
//       case 'Publish':
//         return (
//           <ul className='list-none flex flex-col'>
//             {' '}
//             <Link
//               to='/publish'
//               onClick={() => {
//                 window.scrollTo(0, 0);
//               }}
//               className='hover:bg-white hover:text-blue-950'
//             >
//               <li className='  border-b border-slate-500 pb-2 pt-1'>Publish</li>
//             </Link>
//             <li
//               className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//               onClick={handleComingSoonModalClick}
//             >
//               How to Release
//             </li>
//             <li
//               className='hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1'
//               onClick={handleComingSoonModalClick}
//             >
//               Auditing Body
//             </li>
//           </ul>
//         );
//       case 'Token':
//         return (
//           <ul className='list-none flex flex-col '>
//             <Link
//               to='/token-purchase'
//               onClick={() => {
//                 window.scrollTo(0, 0);
//               }}
//               className='hover:bg-white hover:text-blue-950'
//             >
//               <li className='border-b border-slate-500 pb-2 pt-1'>
//                 Token purchase
//               </li>
//             </Link>
//             <Link
//               to='/token-staking'
//               onClick={() => {
//                 window.scrollTo(0, 0);
//               }}
//               className='hover:bg-white hover:text-blue-950'
//             >
//               <li className='border-b border-slate-500 pt-1 pb-2'>
//                 Token staking
//               </li>
//             </Link>{' '}
//             <Link
//               to='/unlock-allocation'
//               onClick={() => {
//                 window.scrollTo(0, 0);
//               }}
//               className='hover:bg-white hover:text-blue-950'
//             >
//               <li className='border-b border-slate-500 pt-1 pb-2'>
//                 Unlock allocation chart
//               </li>
//             </Link>
//             <li
//               className='hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1'
//               onClick={handleComingSoonModalClick}
//             >
//               Functions
//             </li>
//           </ul>
//         );
//       case 'Help':
//         return (
//           <ul className='list-none flex flex-col'>
//             <Link
//               to='/help-center'
//               onClick={() => {
//                 window.scrollTo(0, 0);
//               }}
//               className='hover:bg-white hover:text-blue-950'
//             >
//               <li className='border-b border-slate-500 pt-1 pb-2'>
//                 Help center
//               </li>
//             </Link>
//             <li
//               className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//               onClick={handleComingSoonModalClick}
//             >
//               User guide
//             </li>
//             <li
//               className='hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1'
//               onClick={handleDownload}
//             >
//               White paper
//             </li>
//           </ul>
//         );
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (location.pathname === '/') {
//       setActiveItem('home');
//     } else if (location.pathname === '/publish') {
//       setActiveItem('publish');
//     } else if (location.pathname === '/token-purchase') {
//       setActiveItem('token-purchase');
//     } else if (location.pathname === '/dataset') {
//       setActiveItem('dataset');
//     } else if (location.pathname === '/token-staking') {
//       setActiveItem('token-staking');
//     } else if (location.pathname === '/unlock-allocation') {
//       setActiveItem('unlock-allocation');
//     } else if (location.pathname === '/help-center') {
//       setActiveItem('help-center');
//     }
//     window.scrollTo(0, 0);
//   }, [location]);

//   const handleLinkClick = (path) => {
//     setMobileMenuOpen(false);
//     history.push(path);
//     window.scrollTo(0, 0);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const activeColor = '#0079D0';

//   const activeLinkStyle = {
//     color: activeColor,
//     textDecoration: 'none',
//     borderBottom: '3px solid  #0079D0 ',
//     paddingBottom: '5px',
//     marginBottom: '-2px',
//   };

//   const handleDocumentClick = (e) => {
//     if (isMobileMenuOpen && !e.target.closest(`.${styles.menuItems}`)) {
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleDocumentClick);
//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//   }, [isMobileMenuOpen]);

//   const logoSrc = scrolling ? Logo : Logo;

//   return (
//     <div>
//       <nav
//         className={`fixed lg:hidden top-0 w-full z-50 text-customGreen  font-medium   bg-[#002B5E] ${styles.navbar} `}
//       >
//         <div
//           className={` xl:flex xl:items-center xl:justify-between xl:pl-20  xl:pr-24 xl:py-4  ${styles.navbarContainer}`}
//         >
//           <img src={logoSrc} className=' ' />
//           <div className={`  ${styles.useruser}`}>
//             <div className={` relative`}>
//               <img
//                 src={User}
//                 alt='User'
//                 className=''
//                 onMouseEnter={() => handleMouseEnter2()}
//                 onMouseLeave={handleMouseLeave2}
//               />{' '}
//               {dropdown2 && (
//                 <div
//                   className='absolute font-normal text-lg top-15  w-[200px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-center py-4 pb-0 shadow-2xl'
//                   onMouseEnter={() => handleMouseEnter2()}
//                   onMouseLeave={handleMouseLeave2}
//                 >
//                   <ul className='list-none flex flex-col'>
//                     <li
//                       className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//                       onClick={handleComingSoonModalClick}
//                       // className='border-b border-slate-500 pb-2 pt-1'
//                     >
//                       No KYC login
//                     </li>
//                     {/* </Link> */}
//                     <li
//                       className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//                       onClick={handleComingSoonModalClick}
//                       // className='border-b border-slate-500 pb-2 pt-1'
//                     >
//                       Security and Privacy
//                     </li>{' '}
//                     <Link
//                       to='/my-releases'
//                       onClick={() => {
//                         window.scrollTo(0, 0);
//                       }}
//                       className='hover:bg-white hover:text-blue-950'
//                     >
//                       <li className='  pt-2 pb-2 '>My releases</li>
//                     </Link>{' '}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
//           <input type='checkbox' onChange={toggleMobileMenu} />
//           <div className={styles.hamburgerLines}>
//             <span className={`bg-white ${styles.line} ${styles.line1} `}></span>
//             <span className={`bg-white ${styles.line} ${styles.line2} `}></span>
//             <span className={`bg-white ${styles.line} ${styles.line3} `}></span>
//           </div>
//           <ul
//             className={`hidden xl:flex bg-[#000b30]  text-base font-thin ${styles.menuItems} `}
//           >
//             <li>
//               <p onClick={() => setSelected('publish')}>Publish</p>
//             </li>
//             {selected === 'publish' && (
//               <span className={`${styles.menuItems2}`}>
//                 {' '}
//                 <li>
//                   <Link
//                     to='/publish'
//                     style={activeItem === 'publish' ? activeLinkStyle : {}}
//                     onClick={() => handleLinkClick('/publish')}
//                   >
//                     Publish
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     onClick={() => {
//                       handleComingSoonModalClick();
//                     }}
//                   >
//                     How to Release
//                   </Link>
//                 </li>
//                 <li>
//                   <Link onClick={handleComingSoonModalClick}>
//                     Auditing Body
//                   </Link>
//                 </li>
//               </span>
//             )}
//             <li>
//               <p onClick={() => setSelected('token')}>Token</p>
//             </li>{' '}
//             {selected === 'token' && (
//               <span className={`${styles.menuItems2}`}>
//                 {' '}
//                 <li>
//                   <Link
//                     to='/token-purchase'
//                     style={
//                       activeItem === 'token-purchase' ? activeLinkStyle : {}
//                     }
//                     onClick={() => handleLinkClick('/token-purchase')}
//                   >
//                     Token purchase
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to='/token-staking'
//                     style={
//                       activeItem === 'token-staking' ? activeLinkStyle : {}
//                     }
//                     onClick={() => handleLinkClick('/token-staking')}
//                   >
//                     Token staking
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to='/unlock-allocation'
//                     style={
//                       activeItem === 'unlock-allocation' ? activeLinkStyle : {}
//                     }
//                     onClick={() => handleLinkClick('/unlock-allocation')}
//                   >
//                     Unlock allocation chart
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     // style={activeItem === 'home' ? activeLinkStyle : {}}
//                     onClick={handleComingSoonModalClick}
//                   >
//                     Functions
//                   </Link>
//                 </li>
//               </span>
//             )}
//             <li>
//               <Link
//                 to='/dataset'
//                 style={activeItem === 'dataset' ? activeLinkStyle : {}}
//                 onClick={() => handleLinkClick('/dataset')}
//               >
//                 Dataset
//               </Link>
//             </li>
//             <li>
//               <p onClick={() => setSelected('help')}>Help</p>
//             </li>
//             {selected === 'help' && (
//               <span className={`${styles.menuItems2}`}>
//                 {' '}
//                 <li>
//                   <Link
//                     to='/help-center'
//                     style={activeItem === 'help-center' ? activeLinkStyle : {}}
//                     onClick={() => handleLinkClick('/help-center')}
//                   >
//                     Help center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link onClick={handleComingSoonModalClick}>User guide</Link>
//                 </li>
//                 <li>
//                   <Link onClick={handleDownload}>White paper</Link>
//                 </li>
//               </span>
//             )}
//           </ul>
//         </div>
//       </nav>{' '}
//       <div
//         className={`bg-[#002B5E] top-0 z-50 shadow-btns fixed  w-full pr-5 md:pr-16 ${styles.navbar} lg:block hidden`}
//       >
//         <div className={`flex justify-between items-center`}>
//           <Link to='/'>
//             <div className='flex items-center gap-4'>
//               <img src={Logo} alt='Logo' />
//               <h3 className='text-white text-2xl'>SeeSeaAI</h3>
//             </div>
//           </Link>{' '}
//           <ul
//             className={`text-white font-[500] text-xl list-none hidden md:flex justify-around w-[40%] `}
//           >
//             {['Publish', 'Token', 'Dataset', 'Help'].map((item, index) => (
//               <li key={index} className='relative'>
//                 <div
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {item === 'Dataset' ? (
//                     <Link to={`/${item.toLowerCase()}`}>{item}</Link>
//                   ) : (
//                     <span className='cursor-pointer'>{item}</span>
//                   )}
//                   {dropdown === index && item !== 'Dataset' && (
//                     <div
//                       className='absolute font-normal text-lg top-5 mt-2 w-[250px] rounded-b-lg -left-24 bg-[#002B5E] text-slate-300 text-center pt-4 shadow-2xl'
//                       onMouseEnter={() => handleMouseEnter(index)}
//                       onMouseLeave={handleMouseLeave}
//                     >
//                       {renderDropdownContent(item)}
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
//           <div className='relatvive'>
//             <img
//               src={User}
//               alt='User'
//               className=''
//               onMouseEnter={() => handleMouseEnter2()}
//               onMouseLeave={handleMouseLeave2}
//             />{' '}
//             {dropdown2 && (
//               <div
//                 className='absolute font-normal text-lg top-15  w-[200px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-center py-4 pb-0 shadow-2xl'
//                 onMouseEnter={() => handleMouseEnter2()}
//                 onMouseLeave={handleMouseLeave2}
//               >
//                 <ul className='list-none flex flex-col'>
//                   <li
//                     className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//                     onClick={handleComingSoonModalClick}
//                     // className='border-b border-slate-500 pb-2 pt-1'
//                   >
//                     No KYC login
//                   </li>
//                   {/* </Link> */}
//                   <li
//                     className='hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1'
//                     onClick={handleComingSoonModalClick}
//                     // className='border-b border-slate-500 pb-2 pt-1'
//                   >
//                     Security and Privacy
//                   </li>{' '}
//                   <Link
//                     to='/my-releases'
//                     onClick={() => {
//                       window.scrollTo(0, 0);
//                     }}
//                     className='hover:bg-white hover:text-blue-950'
//                   >
//                     <li className='  pt-2 pb-2 '>My releases</li>
//                   </Link>{' '}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
