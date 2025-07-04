import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaGraduationCap, FaBriefcase, FaHome, FaHeart, FaShieldAlt, FaMoneyBillWave, FaFileAlt, FaBell, FaStar, FaArrowRight, FaChartLine, FaUsers, FaHandshake } from 'react-icons/fa';

const HomePage = ({ onSearch, onExploreClick, isAuthenticated, userProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Government service categories
  const categories = [
    { id: 'education', name: 'Education', icon: <FaGraduationCap />, color: '#4CAF50', count: 25 },
    { id: 'employment', name: 'Employment', icon: <FaBriefcase />, color: '#2196F3', count: 18 },
    { id: 'housing', name: 'Housing', icon: <FaHome />, color: '#FF9800', count: 12 },
    { id: 'healthcare', name: 'Healthcare', icon: <FaHeart />, color: '#F44336', count: 15 },
    { id: 'security', name: 'Security', icon: <FaShieldAlt />, color: '#9C27B0', count: 8 },
    { id: 'finance', name: 'Finance', icon: <FaMoneyBillWave />, color: '#00BCD4', count: 22 },
    { id: 'documents', name: 'Documents', icon: <FaFileAlt />, color: '#795548', count: 30 }
  ];

  // Quick access services
  const quickServices = [
    { name: 'Aadhaar Services', icon: '🆔', description: 'Update Aadhaar details, download e-Aadhaar', status: 'active' },
    { name: 'PAN Services', icon: '📋', description: 'Apply for PAN, update PAN details', status: 'active' },
    { name: 'Driving License', icon: '🚗', description: 'Apply for DL, check status', status: 'active' },
    { name: 'Passport Services', icon: '📘', description: 'Apply for passport, track application', status: 'active' },
    { name: 'Birth Certificate', icon: '👶', description: 'Apply for birth certificate', status: 'new' },
    { name: 'Death Certificate', icon: '⚰️', description: 'Apply for death certificate', status: 'new' },
    { name: 'Income Tax', icon: '💰', description: 'File ITR, check refund status', status: 'active' },
    { name: 'GST Services', icon: '🏢', description: 'GST registration, filing returns', status: 'active' }
  ];

  // Popular schemes
  const popularSchemes = [
    { name: 'PM Kisan Samman Nidhi', category: 'finance', description: 'Direct income support to farmers', eligibility: 'Small and marginal farmers', priority: 'high' },
    { name: 'PM Awas Yojana', category: 'housing', description: 'Housing for all by 2022', eligibility: 'Economically weaker sections', priority: 'high' },
    { name: 'Ayushman Bharat', category: 'healthcare', description: 'Health insurance for poor families', eligibility: 'Families below poverty line', priority: 'high' },
    { name: 'PM Fasal Bima Yojana', category: 'finance', description: 'Crop insurance scheme', eligibility: 'All farmers', priority: 'medium' },
    { name: 'Skill India Mission', category: 'employment', description: 'Skill development training', eligibility: 'Youth aged 15-45 years', priority: 'medium' },
    { name: 'Beti Bachao Beti Padhao', category: 'education', description: 'Girl child education and protection', eligibility: 'Families with girl children', priority: 'medium' }
  ];

  // Statistics data
  const statistics = [
    { icon: <FaUsers />, number: '1.2M+', label: 'Active Users', color: 'primary' },
    { icon: <FaHandshake />, number: '500+', label: 'Government Services', color: 'success' },
    { icon: <FaChartLine />, number: '95%', label: 'Success Rate', color: 'warning' },
    { icon: <FaStar />, number: '4.8', label: 'User Rating', color: 'info' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    // Filter schemes based on category
    if (categoryId === 'all') {
      // Show all schemes
    } else {
      // Filter by category
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new': return <span className="badge bg-success">New</span>;
      case 'active': return <span className="badge bg-primary">Active</span>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <span className="badge bg-danger">High Priority</span>;
      case 'medium': return <span className="badge bg-warning">Medium Priority</span>;
      default: return null;
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section with Search */}
      <section className="hero-section text-white py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Personalized Government Info Portal
              </h1>
              <p className="lead mb-4">
                Access personalized government schemes, services, and information tailored to your profile. 
                Stay updated with relevant opportunities and benefits.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="search-container mb-4">
                <div className="input-group input-group-lg shadow">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search for schemes, services, or documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '50px 0 0 50px' }}
                  />
                  <button className="btn btn-primary border-0" type="submit" style={{ borderRadius: '0 50px 50px 0' }}>
                    <FaSearch />
                  </button>
                </div>
              </form>

              {!isAuthenticated && (
                <div className="d-flex gap-3">
                  <button className="btn btn-light btn-lg px-4" onClick={onExploreClick}>
                    Explore Services
                  </button>
                  <button className="btn btn-outline-light btn-lg px-4">
                    Learn More
                  </button>
                </div>
              )}
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image">
                <img src="/assets/hero-bg.jpg" alt="Government Services" className="img-fluid rounded shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {statistics.map((stat, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className={`stat-icon mb-3 mx-auto d-flex align-items-center justify-content-center text-${stat.color}`} 
                       style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f8f9fa', fontSize: '2rem' }}>
                    {stat.icon}
                  </div>
                  <h3 className="fw-bold mb-1">{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Government Services</h2>
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category.id} className="col-md-6 col-lg-3">
                <div 
                  className={`category-card card h-100 text-center cursor-pointer border-0 shadow-sm ${selectedCategory === category.id ? 'border-primary' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <div className="card-body">
                    <div 
                      className="category-icon mb-3 mx-auto d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '70px', 
                        height: '70px', 
                        borderRadius: '50%', 
                        backgroundColor: category.color,
                        color: 'white',
                        fontSize: '28px'
                      }}
                    >
                      {category.icon}
                    </div>
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text text-muted mb-2">
                      {category.count} services available
                    </p>
                    <button className="btn btn-outline-primary btn-sm">
                      Explore <FaArrowRight className="ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Services */}
      <section className="quick-services py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5">Quick Access Services</h2>
          <div className="row g-4">
            {quickServices.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="service-card card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="service-icon mb-3" style={{ fontSize: '3rem' }}>
                      {service.icon}
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      {getStatusBadge(service.status)}
                    </div>
                    <h6 className="card-title">{service.name}</h6>
                    <p className="card-text text-muted small mb-3">{service.description}</p>
                    <button className="btn btn-primary btn-sm w-100">
                      Access Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Schemes */}
      <section className="popular-schemes py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Popular Government Schemes</h2>
          <div className="row g-4">
            {popularSchemes.map((scheme, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="scheme-card card h-100 border-0 shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="card-title mb-0">{scheme.name}</h6>
                      <div>
                        <span className="badge bg-primary me-1">{scheme.category}</span>
                        {getPriorityBadge(scheme.priority)}
                      </div>
                    </div>
                    <p className="card-text text-muted mb-3">{scheme.description}</p>
                    <div className="mb-3">
                      <small className="text-muted">
                        <strong>Eligibility:</strong> {typeof scheme.eligibility === 'object' ? 
                          `${scheme.eligibility.age ? `Age: ${scheme.eligibility.age.min || 0}-${scheme.eligibility.age.max || 'Any'}` : ''} ${scheme.eligibility.income ? `Income: Up to ₹${scheme.eligibility.income.max?.toLocaleString() || 'Any'}` : ''} ${scheme.eligibility.occupation ? `Occupation: ${Array.isArray(scheme.eligibility.occupation) ? scheme.eligibility.occupation.join(', ') : scheme.eligibility.occupation}` : ''}`.trim() : 
                          scheme.eligibility
                        }
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary btn-sm">
                        Learn More
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Section (if authenticated) */}
      {isAuthenticated && userProfile && (
        <section className="personalized-section py-5 bg-white">
          <div className="container">
            <h2 className="text-center mb-5">
              <FaStar className="text-warning me-2" />
              Personalized for You
            </h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaBell className="text-primary me-2" />
                      Recommended Schemes
                    </h5>
                    <p className="card-text">
                      Based on your profile: {userProfile.age || 'Not specified'} years old, {userProfile.education || 'Not specified'}, 
                      {userProfile.occupation || userProfile.employmentType || 'Not specified'} from {userProfile.state || 'Not specified'}
                    </p>
                    <div className="recommended-schemes">
                      <div className="scheme-item p-3 border rounded mb-2">
                        <h6>PM Kisan Samman Nidhi</h6>
                        <small className="text-muted">Perfect match for your profile</small>
                      </div>
                      <div className="scheme-item p-3 border rounded mb-2">
                        <h6>Skill India Mission</h6>
                        <small className="text-muted">Great opportunity for skill development</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaUser className="text-success me-2" />
                      Your Profile Summary
                    </h5>
                    <div className="profile-summary">
                      <div className="row">
                        <div className="col-6">
                          <p><strong>Age:</strong> {userProfile.age || 'Not specified'}</p>
                          <p><strong>Education:</strong> {userProfile.education || 'Not specified'}</p>
                          <p><strong>Employment:</strong> {userProfile.occupation || userProfile.employmentType || 'Not specified'}</p>
                        </div>
                        <div className="col-6">
                          <p><strong>State:</strong> {userProfile.state || 'Not specified'}</p>
                          <p><strong>Income:</strong> {userProfile.income || userProfile.incomeStatus || 'Not specified'}</p>
                          <p><strong>Gender:</strong> {userProfile.gender || 'Not specified'}</p>
                        </div>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="cta-section py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="container text-center text-white">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Create your personalized profile to access tailored government services and schemes.
          </p>
          {!isAuthenticated ? (
            <button className="btn btn-light btn-lg px-5">
              Create Account
            </button>
          ) : (
            <button className="btn btn-light btn-lg px-5">
              Explore More Services
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 