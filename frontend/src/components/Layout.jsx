/* eslint-disable react/prop-types */
import { Navbar, ScrollToTop } from './index';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen  '>
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
