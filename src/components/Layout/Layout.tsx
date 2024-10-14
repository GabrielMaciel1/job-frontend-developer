import './style.css';
import { Outlet } from 'react-router';

const Layout = () => (
  <div className='container'>
    <Outlet />
  </div>
);

export default Layout;
