import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaGraduationCap, FaFileInvoiceDollar, FaClock, FaCalendar, FaExclamationTriangle, FaInbox, FaSpinner } from 'react-icons/fa';

const ServiceDetails = ({ serviceType, onClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log('ServiceDetails rendered with:', { serviceType, onClose });

  useEffect(() => {
    console.log('ServiceDetails useEffect triggered, fetching data for:', serviceType);
    fetchData();
  }, [serviceType, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '';
      
      switch (serviceType) {
        case 'schemes':
          url = `/api/schemes?page=${currentPage}&limit=6`;
          break;
        case 'exams':
          url = `/api/schemes/category/education?page=${currentPage}&limit=6`;
          break;
        case 'tax':
          url = `/api/notifications/type/tax?page=${currentPage}&limit=6`;
          break;
        case 'documents':
          url = `/api/schemes/category/documents?page=${currentPage}&limit=6`;
          break;
        default:
          url = `/api/schemes?page=${currentPage}&limit=6`;
      }

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      
      if (serviceType === 'tax') {
        setData(result.notifications || []);
        setTotalPages(result.totalPages || 1);
      } else {
        setData(result.schemes || []);
        setTotalPages(result.totalPages || 1);
      }
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'schemes': return 'Government Schemes';
      case 'exams': return 'Competitive Exams & Education';
      case 'tax': return 'Tax Updates & Notifications';
      case 'documents': return 'Document Services';
      default: return 'Service Details';
    }
  };

  const getServiceDescription = () => {
    switch (serviceType) {
      case 'schemes': return 'Discover government schemes tailored to your profile and needs.';
      case 'exams': return 'Stay updated with latest competitive exams and educational opportunities.';
      case 'tax': return 'Get the latest tax-related updates and important notifications.';
      case 'documents': return 'Access government document services and applications.';
      default: return 'Service information and updates.';
    }
  };

  const formatEligibility = (eligibility) => {
    if (!eligibility) return 'Not specified';
    
    if (typeof eligibility === 'string') return eligibility;
    
    if (typeof eligibility === 'object') {
      const parts = [];
      
      if (eligibility.age) parts.push(`Age: ${eligibility.age}`);
      if (eligibility.income) parts.push(`Income: ${eligibility.income}`);
      if (eligibility.occupation) parts.push(`Occupation: ${eligibility.occupation}`);
      if (eligibility.education) parts.push(`Education: ${eligibility.education}`);
      if (eligibility.state) parts.push(`State: ${eligibility.state}`);
      if (eligibility.gender) parts.push(`Gender: ${eligibility.gender}`);
      
      return parts.length > 0 ? parts.join(', ') : 'Not specified';
    }
    
    return 'Not specified';
  };

  const renderSchemeCard = (scheme) => (
    <div key={scheme._id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h6 className="card-title text-primary fw-bold">{scheme.title}</h6>
          <p className="card-text small text-muted mb-2">{scheme.description}</p>
          
          <div className="mb-3">
            <small className="text-muted">
              <strong>Eligibility:</strong> {formatEligibility(scheme.eligibility)}
            </small>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">
              <strong>Benefits:</strong> {scheme.benefits}
            </small>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-success">{scheme.category}</span>
            <button 
              type="button"
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle view details - you can add more functionality here
                console.log('View details for:', scheme.title);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationCard = (notification) => (
    <div key={notification._id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h6 className="card-title text-primary fw-bold">{notification.title}</h6>
          <p className="card-text small text-muted mb-2">{notification.message}</p>
          
          <div className="mb-3">
            <small className="text-muted">
              <FaClock className="me-1" />
              {new Date(notification.createdAt).toLocaleDateString()}
            </small>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-info">{notification.type}</span>
            <button 
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle read more - you can add more functionality here
                console.log('Read more for:', notification.title);
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal fade show service-details-modal" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {serviceType === 'schemes' ? <FaBullhorn className="me-2" /> : 
               serviceType === 'exams' ? <FaGraduationCap className="me-2" /> : 
               serviceType === 'tax' ? <FaFileInvoiceDollar className="me-2" /> :
               <FaFileInvoiceDollar className="me-2" />}
              {getServiceTitle()}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <p className="text-muted mb-4">{getServiceDescription()}</p>
            
            {loading && (
              <div className="text-center py-5">
                <FaSpinner className="fa-spin text-primary" style={{ fontSize: '3rem' }} />
                <p className="mt-3">Loading {getServiceTitle()}...</p>
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger text-center">
                <FaExclamationTriangle className="me-2" />
                {error}
                <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchData}>
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && data.length === 0 && (
              <div className="text-center py-5">
                <FaInbox className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                <h5 className="text-muted">No {getServiceTitle()} found</h5>
                <p className="text-muted">Check back later for updates.</p>
              </div>
            )}
            
            {!loading && !error && data.length > 0 && (
              <>
                <div className="row">
                  {serviceType === 'tax' 
                    ? data.map(renderNotificationCard)
                    : data.map(renderSchemeCard)
                  }
                </div>
                
                {totalPages > 1 && (
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </div>
  );
};

export default ServiceDetails; 