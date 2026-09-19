import { NavLink } from 'react-router-dom';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="logo">
          <span className="pi">π</span>-chan
        </NavLink>
        <nav className="topnav">
          <NavLink to="/math" className={({ isActive }) => (isActive ? 'active' : '')}>
            Математика
          </NavLink>
          <NavLink to="/physics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Физика
          </NavLink>
        </nav>
        <NavLink to="/forum" className="forum-btn">
          Форум <span className="soon">скоро</span>
        </NavLink>
      </div>
    </div>
  );
}
