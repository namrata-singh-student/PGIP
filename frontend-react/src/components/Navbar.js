import React, { useState } from 'react';

const Navbar = ({ 
  activeSection, 
  onSectionClick, 
  onLoginClick,
  onContactClick,
  onAboutClick,
  onFAQClick,
  isAuthenticated,
  userProfile,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for "${searchQuery}"... (Integrate with backend API for actual search results)`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container">
        {/* Bharat Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="/assets/logo.png" alt="Bharat Logo" className="me-2" style={{ height: '40px' }} />
          <span>PGIP</span>
        </a>
        
        {/* Toggler for Mobile View */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} 
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  onSectionClick('hero');
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onSectionClick('services');
                }}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} 
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  onSectionClick('features');
                }}
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'statistics' ? 'active' : ''}`} 
                href="#statistics"
                onClick={(e) => {
                  e.preventDefault();
                  onSectionClick('statistics');
                }}
              >
                Statistics
              </a>
            </li>
            {/* Dropdown for More Links */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a 
                    className="dropdown-item" 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onContactClick();
                    }}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a 
                    className="dropdown-item" 
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      onAboutClick();
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    className="dropdown-item" 
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      onFAQClick();
                    }}
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          
          {/* Search Bar */}
          <form className="d-flex ms-3" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
          
          {/* Authentication Buttons */}
          {isAuthenticated ? (
            <div className="d-flex align-items-center ms-3">
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user me-1"></i>
                  {userProfile?.name || 'User'}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <span className="dropdown-item-text">
                      <strong>Welcome, {userProfile?.name}!</strong>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#profile">
                      <i className="fas fa-user-cog me-2"></i>Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#settings">
                      <i className="fas fa-cog me-2"></i>Settings
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={onLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button 
              className="btn btn-outline-light ms-2" 
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 