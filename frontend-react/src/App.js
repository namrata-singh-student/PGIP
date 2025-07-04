import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Services from './components/Services';
import Features from './components/Features';
import Statistics from './components/Statistics';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import FAQModal from './components/FAQModal';
import ScrollToTop from './components/ScrollToTop';
import ConnectionTest from './components/ConnectionTest';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

    const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    const profileString = localStorage.getItem('userProfile');
    
    if (token && profileString) {
      try {
        // Try to parse the profile from localStorage
        const profile = JSON.parse(profileString);
        if (!profile || typeof profile !== 'object') {
          throw new Error('Invalid profile data');
        }
        
        // Verify token with backend
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUserProfile(userData.profile);
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('userProfile');
          setIsAuthenticated(false);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    }
    setAuthLoading(false);
  };

  // Handle successful authentication
  const handleAuthSuccess = (token, profile) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsAuthenticated(true);
    setUserProfile(profile);
    setShowAuthModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setUserProfile(null);
    alert('Logged out successfully!');
  };

  // Handle scroll events for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'features', 'statistics'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Show/hide scroll to top button
      setShowScrollToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      alert(`Searching for "${query}"... (Integrate with backend API for actual search results)`);
    } else {
      alert("Please enter a search term.");
    }
  };

  const appStyle = {
    backgroundImage: "url('/assets/background.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh'
  };

  if (authLoading) {
    return (
      <div className="App d-flex align-items-center justify-content-center" style={appStyle}>
        <div className="text-center text-white">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading PGIP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={appStyle}>
      <Navbar 
        activeSection={activeSection} 
        onSectionClick={scrollToSection}
        onLoginClick={() => setShowAuthModal(true)}
        onContactClick={() => setShowContactModal(true)}
        onAboutClick={() => setShowAboutModal(true)}
        onFAQClick={() => setShowFAQModal(true)}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
        onLogout={handleLogout}
      />
      
      {isAuthenticated ? (
        <Dashboard userProfile={userProfile} />
      ) : (
        <>
          <div id="home">
            <HomePage 
              onSearch={handleSearch}
              onExploreClick={() => scrollToSection('features')}
              isAuthenticated={isAuthenticated}
              userProfile={userProfile}
            />
          </div>
          
          <ConnectionTest />
          
          <div id="services">
            <Services />
          </div>
          
          <div id="features">
            <Features />
          </div>
          
          <div id="statistics">
            <Statistics />
          </div>
        </>
      )}
      
      {/* Authentication Modal */}
      <AuthModal 
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      {/* Contact Modal */}
      <ContactModal 
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
      />
      
      {/* About Modal */}
      <AboutModal 
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
      />
      
      {/* FAQ Modal */}
      <FAQModal 
        show={showFAQModal}
        onHide={() => setShowFAQModal(false)}
      />
      
      {/* Scroll to Top Button */}
      <ScrollToTop show={showScrollToTop} />
      
      {/* Footer */}
      <Footer 
        onSectionClick={scrollToSection}
        onContactClick={() => setShowContactModal(true)}
        onAboutClick={() => setShowAboutModal(true)}
      />
    </div>
  );
}

export default App; 