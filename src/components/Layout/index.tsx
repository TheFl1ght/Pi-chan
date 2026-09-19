import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import AdminBar from '../../admin/AdminBar';
import { useScrollToTopOnNavigate } from './Layout';
import './Layout.css';

export default function Layout() {
  useScrollToTopOnNavigate();

  return (
    <>
      <TopBar />
      <div className="wrap">
        <Outlet />
      </div>
      <Footer />
      <AdminBar />
    </>
  );
}
