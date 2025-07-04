import React, { useState, useEffect } from 'react';

const ServiceDetails = ({ serviceType, onClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
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
      default: return 'Service Details';
    }
  };

  const getServiceDescription = () => {
    switch (serviceType) {
      case 'schemes': return 'Discover government schemes tailored to your profile and needs.';
      case 'exams': return 'Stay updated with latest competitive exams and educational opportunities.';
      case 'tax': return 'Get the latest tax-related updates and important notifications.';
      default: return 'Service information and updates.';
    }
  };

  const renderSchemeCard = (scheme) => (
    <div key={scheme._id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="card-title mb-0">{scheme.title}</h6>
            <span className={`badge ${scheme.status === 'active' ? 'bg-success' : scheme.status === 'upcoming' ? 'bg-warning' : 'bg-secondary'}`}>
              {scheme.status}
            </span>
          </div>
          <p className="card-text small text-muted">{scheme.description.substring(0, 100)}...</p>
          <div className="mb-2">
            <span className="badge bg-primary me-1">{scheme.category}</span>
            {scheme.budget && (
              <span className="badge bg-info">₹{scheme.budget.toLocaleString()}</span>
            )}
          </div>
          {scheme.deadline && (
            <p className="small text-danger mb-0">
              <i className="fas fa-clock me-1"></i>
              Deadline: {new Date(scheme.deadline).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="card-footer bg-transparent">
          <button className="btn btn-outline-primary btn-sm w-100">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationCard = (notification) => (
    <div key={notification._id} className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="card-title mb-0">{notification.title}</h6>
            <span className={`badge ${notification.type === 'urgent' ? 'bg-danger' : notification.type === 'important' ? 'bg-warning' : 'bg-info'}`}>
              {notification.type}
            </span>
          </div>
          <p className="card-text small text-muted">{notification.message.substring(0, 100)}...</p>
          <div className="mb-2">
            <span className="badge bg-secondary me-1">{notification.category}</span>
          </div>
          <p className="small text-muted mb-0">
            <i className="fas fa-calendar me-1"></i>
            {new Date(notification.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="card-footer bg-transparent">
          <button className="btn btn-outline-primary btn-sm w-100">
            Read More
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className={`fas ${serviceType === 'schemes' ? 'fa-bullhorn' : serviceType === 'exams' ? 'fa-graduation-cap' : 'fa-file-invoice-dollar'} me-2`}></i>
              {getServiceTitle()}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <p className="text-muted mb-4">{getServiceDescription()}</p>
            
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading {getServiceTitle()}...</p>
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger text-center">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
                <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchData}>
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && data.length === 0 && (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
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