import React, { useState } from 'react';

const Hero = ({ onSearch, onExploreClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section 
      id="hero" 
      className="hero-section text-center" 
      style={{ 
        background: "url('/assets/hero-bg.jpg') no-repeat center center/cover", 
        padding: '60px 0' 
      }}
    >
      <div className="container text-white">
        <h1 className="display-4 fw-bold">
          Welcome to Personalized Government Info Portal
        </h1>
        <p className="lead">
          Your gateway to government services, schemes, and updates.
        </p>
        <div className="search-bar mb-4">
          <input 
            type="text" 
            className="form-control w-50 mx-auto" 
            placeholder="Search government schemes, exams, or updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button 
          className="btn btn-primary btn-lg me-3" 
          onClick={onExploreClick}
        >
          Explore Features
        </button>
        <button 
          className="btn btn-outline-light btn-lg" 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero; 