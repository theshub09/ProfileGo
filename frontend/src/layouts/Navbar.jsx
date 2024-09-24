import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Button from '../components/Button';

export default function Navbar() {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLinkClick = () => {
    setIsNavCollapsed(true);  // Close navbar when a link is clicked
  };

  return (
    <header id="navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <h1 className="h1-logo">ConnectGO</h1>
          </NavLink>
          <button
            className={`navbar-toggler ml-auto custom-toggler ${!isNavCollapsed ? 'collapsed' : ''}`}
            type="button"
            onClick={handleNavToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-end ${isNavCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-login" onClick={handleLinkClick}>
                  Admin Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={handleLinkClick}>
                  Home <HomeOutlinedIcon />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/aboutus' ? 'active' : ''}`} to="/aboutus" onClick={handleLinkClick}>
                  About Us <Groups2OutlinedIcon />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/explore" onClick={handleLinkClick}>
                  <div style={{ marginTop: '0.5rem', paddingLeft: '0.8rem', paddingRight: '2rem' }}>
                    <Button label="Explore" c="login-btn" type="start" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
