import React from 'react';

const Footer = ({ onSectionClick, onContactClick, onAboutClick }) => {
  const handleInternalLink = (e, sectionId) => {
    e.preventDefault();
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (onAboutClick) {
      onAboutClick();
    }
  };

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* Main Info Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">Personalized Government Info Portal</h5>
            <p className="text-light mb-3">
              Your one-stop destination for personalized government schemes, services, and information. 
              Get tailored recommendations based on your profile and location.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white text-decoration-none" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white text-decoration-none" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white text-decoration-none" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white text-decoration-none" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#home" className="text-light text-decoration-none" onClick={(e) => handleInternalLink(e, 'home')}>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-light text-decoration-none" onClick={(e) => handleInternalLink(e, 'services')}>
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#features" className="text-light text-decoration-none" onClick={(e) => handleInternalLink(e, 'features')}>
                  Schemes
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-light text-decoration-none" onClick={handleAboutClick}>
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-light text-decoration-none" onClick={handleContactClick}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Government Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3">Government Services</h6>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center justify-content-between">
                <span>
                  <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                    Aadhaar Services
                  </a>
                </span>
                <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm ms-2">
                  Explore
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center justify-content-between">
                <span>
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                    PAN Card
                  </a>
                </span>
                <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm ms-2">
                  Explore
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center justify-content-between">
                <span>
                  <a href="https://passportindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                    Passport Services
                  </a>
                </span>
                <a href="https://passportindia.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm ms-2">
                  Explore
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center justify-content-between">
                <span>
                  <a href="https://sarathi.parivahan.gov.in" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                    Driving License
                  </a>
                </span>
                <a href="https://sarathi.parivahan.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm ms-2">
                  Explore
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center justify-content-between">
                <span>
                  <a href="https://crsorgi.gov.in" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                    Birth Certificate
                  </a>
                </span>
                <a href="https://crsorgi.gov.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm ms-2">
                  Explore
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="mb-3">Contact Us</h6>
            <div className="mb-3">
              <i className="fas fa-map-marker-alt me-2"></i>
              <span className="text-light">Government Complex, New Delhi, India</span>
            </div>
            <div className="mb-3">
              <i className="fas fa-phone me-2"></i>
              <a href="tel:+911800XXXXXXX" className="text-light text-decoration-none">+91 1800-XXX-XXXX</a>
            </div>
            <div className="mb-3">
              <i className="fas fa-envelope me-2"></i>
              <a href="mailto:info@pgip.gov.in" className="text-light text-decoration-none">info@pgip.gov.in</a>
            </div>
            <div className="mb-3">
              <i className="fas fa-clock me-2"></i>
              <span className="text-light">Mon-Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light mb-0">© 2024 PGIP. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <a href="#" className="text-light text-decoration-none small">Privacy Policy</a>
              <a href="#" className="text-light text-decoration-none small">Terms of Service</a>
              <a href="#" className="text-light text-decoration-none small">Accessibility</a>
              <a href="#" className="text-light text-decoration-none small">Sitemap</a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="bg-secondary bg-opacity-25 p-3 rounded">
              <div className="row text-center">
                <div className="col-md-3 mb-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-shield-alt text-success me-2"></i>
                    <span className="small text-light">Secure & Encrypted</span>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-mobile-alt text-primary me-2"></i>
                    <span className="small text-light">Mobile Friendly</span>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-globe text-info me-2"></i>
                    <span className="small text-light">24/7 Available</span>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-headset text-warning me-2"></i>
                    <span className="small text-light">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 