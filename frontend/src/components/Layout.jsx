/* eslint-disable react/prop-types */
import { Navbar } from './index';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen  '>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
