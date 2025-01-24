/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo, User } from "../assets";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import ComingSoon from "./ComingSoon";
import { useTranslation } from "react-i18next";
import { FaMap, FaStore, FaCoins, FaInfoCircle, FaGlobe } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { ConnectWallet } from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdown2, setDropdown2] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);

  const handleTokenomicsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const targetElement = document.getElementById("tokenomics");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleComingSoonModalClick = () => {
    setMobileMenuOpen(false);
    setModalOpen(!modalOpen);
  };

  const closeComingSoonModal = () => {
    setModalOpen(false);
  };

  const handleMouseEnter = (index) => {
    if (index !== 2) {
      // setDropdown(index);
    }
    setIsDropdownVisible(true);
  };

  const handleMouseEnter2 = (index) => {
    if (index !== 2) {
      // setDropdown(index);
    }
    setIsDropdownVisible2(true);
  };

  // const handleMouseEnter2 = () => {
  //   if (!isMobile) {
  //     setDropdown2(true);
  //   }
  // };

  const handleDropdownMouseEnter = () => {
    // setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    // setIsHoveringDropdown(false);
    setIsDropdownVisible(false);
  };

  const handleDropdownMouseEnter2 = () => {
    // setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave2 = () => {
    // setIsHoveringDropdown(false);
    setIsDropdownVisible2(false);
  };

  const handleMouseLeave = () => {
    // setDropdown(null);
  };

  const handleMouseLeave2 = () => {
    setDropdown2(null);
  };

  // const auth = true;
  const auth = sessionStorage.getItem("auth");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setActiveItem('home');
  //   } else if (location.pathname === '/publish') {
  //     setActiveItem('publish');
  //   } else if (location.pathname === '/token-purchase') {
  //     setActiveItem('token-purchase');
  //   } else if (location.pathname === '/dataset') {
  //     setActiveItem('dataset');
  //   } else if (location.pathname === '/token-staking') {
  //     setActiveItem('token-staking');
  //   } else if (location.pathname === '/unlock-allocation') {
  //     setActiveItem('unlock-allocation');
  //   } else if (location.pathname === '/help-center') {
  //     setActiveItem('help-center');
  //   }
  //   window.scrollTo(0, 0);
  // }, [location]);

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    history.push(path);
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // const activeColor = '#0079D0';

  // const activeLinkStyle = {
  //   color: activeColor,
  //   textDecoration: 'none',
  //   borderBottom: '3px solid  #0079D0 ',
  //   paddingBottom: '5px',
  //   marginBottom: '-2px',
  // };

  const handleDocumentClick = (e) => {
    if (isMobileMenuOpen && !e.target.closest(`.${styles.menuItems}`)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMobileMenuOpen]);

  const logoSrc = scrolling ? Logo : Logo;
  return (
    <div>
      <nav
        className={`fixed lg:hidden top-0 w-full z-[80] text-customGreen  font-medium bg-gradient-to-b from-blue-400 to-[#6bccf4] ${styles.navbar} `}
      >
        <div
          className={` xl:flex xl:items-center xl:justify-between xl:pl-20  xl:pr-24 xl:py-4  ${styles.navbarContainer}`}
        >
          <div className="flex flex-row justify-between mr-20">
            <Link to="/">
              <img src={logoSrc} className="w-12 h-12 mt-2 ml-2  my-auto" />
            </Link>
            <div
              className={`flex items-center gap-3 text-white ${styles.useruser}`}
            >
              <div className="relative group">
                <button className="flex items-center space-x-1 ">
                  <FaGlobe
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                    style={{ fontSize: "25px" }}
                    className="group-hover:mt-0 transform group-hover:rotate-180 transition-transform"
                  />
                </button>
                {/* Dropdown - Hidden initially */}
                {isDropdownVisible && (
                  <div
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="absolute overflow-x-auto scroll-smooth scrollbar-hide -left-16 mt-1   w-[150px]  bg-blue-500 text-blue-600 shadow-xl rounded "
                  >
                    <LanguageSelector
                      setIsDropdownVisible={setIsDropdownVisible}
                    />
                  </div>
                )}
              </div>{" "}
              {auth ? (
                <>
                  <div className="relative group2">
                    <button className="flex items-center space-x-1 ">
                      <img
                        src={User}
                        className="w-12"
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        onClick={() =>
                          setIsDropdownVisible2(!isDropdownVisible2)
                        }
                        // style={{ fontSize: '25px' }}
                        // className='group2-hover:mt-0 transform group2-hover:rotate-180 transition-transform'
                      />
                    </button>
                    {/* Dropdown - Hidden initially */}
                    {isDropdownVisible2 && (
                      <div
                        onMouseEnter={handleDropdownMouseEnter2}
                        onMouseLeave={handleDropdownMouseLeave2}
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                        className="absolute overflow-x-auto scroll-smooth scrollbar-hide -left-16 mt-1   w-[150px]  bg-blue-500 text-blue-600 shadow-xl rounded "
                      >
                        <div className=" font-normal text-lg top-15  w-[150px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-left py-4 pb-0 shadow-2xl">
                          <ul className="list-none flex flex-col">
                            <li className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1">
                              <Link to={`/profile`}>Profile</Link>
                            </li>
                            {/* </Link> */}
                            <li
                              className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1"
                              // onClick={handleComingSoonModalClick}
                            >
                              <Link to={`/maps`}>Map</Link>
                            </li>{" "}
                            <li
                              className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1"
                              // onClick={handleComingSoonModalClick}
                            >
                              <Link to={`/market`}>Market</Link>
                            </li>{" "}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>{" "}
                  <ConnectWallet
                    className={` w-full hidden sm:block font-inter`}
                    innerClassName={`px-6 rounded-[10px]`}
                    outerClassName={`rounded-[10px]`}
                  />
                </>
              ) : (
                <ConnectWallet
                  className={` w-full hidden sm:block font-inter`}
                  innerClassName={`px-6 rounded-[10px]`}
                  outerClassName={`rounded-[10px]`}
                />
              )}
            </div>
          </div>
          {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
          <input type="checkbox" onChange={toggleMobileMenu} />
          <div className={styles.hamburgerLines}>
            <span className={`bg-white ${styles.line} ${styles.line1} `}></span>
            <span className={`bg-white ${styles.line} ${styles.line2} `}></span>
            <span className={`bg-white ${styles.line} ${styles.line3} `}></span>
          </div>
          <ul
            className={`hidden text-white xl:flex bg-[#2b86e0]  text-base font-thin ${styles.menuItems} `}
          >
            <li>
              <Link
                to={`/maps`}
                className="flex items-center space-x-1 "
                onClick={() => handleLinkClick("/maps")}
              >
                <FaMap />
                <span> {t("map")}</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/market`}
                className="flex items-center space-x-1 "
                onClick={() => handleLinkClick("/market")}
              >
                <FaStore />
                <span> {t("market")}</span>
              </Link>
            </li>{" "}
            <li>
              <div>
                <a
                  onClick={handleTokenomicsClick}
                  href="/#tokenomics"
                  className="flex items-center space-x-1 "
                >
                  {" "}
                  <FaCoins />
                  <span> {t("tokenomics")}</span>
                </a>
              </div>
            </li>
            <li>
              <Link
                to={`/about`}
                className="flex items-center space-x-1 "
                onClick={() => handleLinkClick("/about")}
              >
                <FaInfoCircle />
                <span> {t("about")}</span>
              </Link>
            </li>
            <ConnectWallet
              className={`mt-5 w-[47vw] sm:hidden  font-bold block font-inter`}
              innerClassName={`px-6  rounded-[10px]`}
              outerClassName={`rounded-[10px]`}
            />
          </ul>
        </div>
      </nav>{" "}
      <div
        className={`bg-gradient-to-b fixed w-full shadow-xl z-50 top-0 from-blue-400 to-[#6bccf4] p-2 px-5 flex items-center justify-between space-x-4 text-white shadow-btns ${styles.navbar} lg:block hidden`}
      >
        <div className={`flex justify-between items-center`}>
          <Link to="/">
            <div className="flex items-center gap-4">
              <img src={Logo} alt="Logo" className="w-16 h-16 " />
            </div>
          </Link>{" "}
          <ul
            className={`hidden md:flex justify-between w-0  md:w-1/2 items-center bg-[#2b86e0] rounded-lg shadow-lg px-5 py-3 text-white list-none`}
          >
            <li className="relative">
              <div>
                <Link to={`/maps`} className="flex items-center space-x-1 ">
                  <FaMap />
                  <span> {t("map")}</span>
                </Link>
              </div>
            </li>
            <li className="relative">
              <div>
                <Link to={`/market`} className="flex items-center space-x-1 ">
                  <FaStore />
                  <span> {t("market")}</span>
                </Link>
              </div>
            </li>
            <li className="relative">
              <div>
                <a
                  onClick={handleTokenomicsClick}
                  href="/#tokenomics"
                  className="flex items-center space-x-1 "
                >
                  {" "}
                  <FaCoins />
                  <span> {t("tokenomics")}</span>
                </a>
              </div>
            </li>
            <li className="relative">
              <div>
                {" "}
                <Link to={`/about`} className="flex items-center space-x-1 ">
                  <FaInfoCircle />
                  <span> {t("about")}</span>
                </Link>
              </div>
            </li>
          </ul>
          {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center space-x-1 ">
                <FaGlobe
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setIsDropdownVisible(true)}
                  style={{ fontSize: "25px" }}
                  className="group-hover:mt-0 transform group-hover:rotate-180 transition-transform"
                />
              </button>
              {/* Dropdown - Hidden initially */}
              {isDropdownVisible && (
                <div
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  className="absolute overflow-x-auto scroll-smooth scrollbar-hide -left-16 mt-1   w-[150px]  bg-blue-500 text-blue-600 shadow-xl rounded "
                >
                  <LanguageSelector
                    setIsDropdownVisible={setIsDropdownVisible}
                  />
                </div>
              )}
            </div>{" "}
            {auth ? (
              <>
                <div className="relative group2">
                  <button className="flex items-center space-x-1 ">
                    <img
                      src={User}
                      className="w-12"
                      onMouseEnter={handleMouseEnter2}
                      onMouseLeave={handleMouseLeave2}
                      onClick={() => setIsDropdownVisible2(!isDropdownVisible2)}
                      // style={{ fontSize: '25px' }}
                      // className='group2-hover:mt-0 transform group2-hover:rotate-180 transition-transform'
                    />
                  </button>
                  {/* Dropdown - Hidden initially */}
                  {isDropdownVisible2 && (
                    <div
                      onMouseEnter={handleDropdownMouseEnter2}
                      onMouseLeave={handleDropdownMouseLeave2}
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                      className="absolute overflow-x-auto scroll-smooth scrollbar-hide -left-16 mt-1   w-[150px]  bg-blue-500 text-blue-600 shadow-xl rounded "
                    >
                      <div className=" font-normal text-lg top-15  w-[150px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-left py-4 pb-0 shadow-2xl">
                        <ul className="list-none flex flex-col">
                          <li className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1">
                            <Link to={`/profile`}>Profile</Link>
                          </li>
                          {/* </Link> */}
                          <li
                            className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1"
                            // onClick={handleComingSoonModalClick}
                          >
                            <Link to={`/maps`}>Map</Link>
                          </li>{" "}
                          <li
                            className="hover:bg-white hover:text-blue-950 cursor-pointer pl-4   border-b border-slate-500 pb-2 pt-1"
                            // onClick={handleComingSoonModalClick}
                          >
                            <Link to={`/market`}>Market</Link>
                          </li>{" "}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>{" "}
                <ConnectWallet
                  className={` w-full hidden sm:block font-inter`}
                  innerClassName={`px-6 rounded-[10px]`}
                  outerClassName={`rounded-[10px]`}
                />
              </>
            ) : (
              <ConnectWallet
                className={` w-full hidden sm:block font-inter`}
                innerClassName={`px-6 rounded-[10px]`}
                outerClassName={`rounded-[10px]`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
