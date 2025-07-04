import React from 'react';

const ScrollToTop = ({ show, onClick }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (onClick) onClick();
  };

  if (!show) return null;

  return (
    <button 
      className="btn btn-primary scroll-to-top" 
      onClick={handleClick}
      title="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
};

export default ScrollToTop; 