/* eslint-disable react/prop-types */
import { Navbar } from './index';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-blue-200'>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
