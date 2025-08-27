import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Row, Col, Card, Badge, Alert, Pagination, Spinner } from 'react-bootstrap';
import { FaBullhorn, FaGraduationCap, FaFileInvoiceDollar, FaClock, FaExclamationTriangle, FaInbox, FaSpinner } from 'react-icons/fa';

const ServiceDetails = ({ serviceType, onClose, show }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);

  console.log('ServiceDetails rendered with:', { serviceType, onClose, show });

  const fetchData = useCallback(async () => {
    console.log('fetchData called with:', { serviceType, currentPage });
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

      console.log('Making API call to:', url);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Request headers:', headers);
      const response = await fetch(url, { headers });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API response:', result);
      
      if (serviceType === 'tax') {
        setData(result.notifications || []);
        setTotalPages(result.totalPages || 1);
      } else {
        setData(result.schemes || []);
        setTotalPages(result.totalPages || 1);
      }
      
      console.log('Data set successfully:', { data: result, serviceType });
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [serviceType, currentPage]);

  useEffect(() => {
    console.log('ServiceDetails useEffect triggered, fetching data for:', serviceType);
    if (show) {
      fetchData();
    }
  }, [show, fetchData]);

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

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  const renderSchemeCard = (scheme) => (
    <Col key={scheme._id} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Body>
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
            <Badge bg="success">{scheme.category}</Badge>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => handleViewDetails(scheme)}
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderNotificationCard = (notification) => (
    <Col key={notification._id} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <h6 className="card-title text-primary fw-bold">{notification.title}</h6>
          <p className="card-text small text-muted mb-2">{notification.message}</p>
          
          <div className="mb-3">
            <small className="text-muted">
              <FaClock className="me-1" />
              {new Date(notification.createdAt).toLocaleDateString()}
            </small>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="info">{notification.type}</Badge>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => handleViewDetails(notification)}
            >
              Read More
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderItemDetails = () => {
    if (!selectedItem) return null;

    return (
      <Modal show={showItemDetails} onHide={() => setShowItemDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {serviceType === 'tax' ? selectedItem.title : selectedItem.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {serviceType === 'tax' ? (
            <div>
              <p className="mb-3">{selectedItem.message}</p>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Type:</strong> {selectedItem.type}</p>
                  <p><strong>Created:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Priority:</strong> {selectedItem.priority || 'Normal'}</p>
                  <p><strong>Status:</strong> {selectedItem.status || 'Active'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-3">{selectedItem.description}</p>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Category:</strong> {selectedItem.category}</p>
                  <p><strong>Eligibility:</strong> {formatEligibility(selectedItem.eligibility)}</p>
                  <p><strong>Benefits:</strong> {selectedItem.benefits}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Application Process:</strong> {selectedItem.applicationProcess || 'Online application available'}</p>
                  <p><strong>Deadline:</strong> {selectedItem.deadline || 'No deadline specified'}</p>
                  <p><strong>Contact:</strong> {selectedItem.contact || 'Contact your local government office'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemDetails(false)}>
            Close
          </Button>
          <Button variant="primary">
            {serviceType === 'tax' ? 'Mark as Read' : 'Apply Now'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="xl" scrollable>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {serviceType === 'schemes' ? <FaBullhorn className="me-2" /> : 
             serviceType === 'exams' ? <FaGraduationCap className="me-2" /> : 
             serviceType === 'tax' ? <FaFileInvoiceDollar className="me-2" /> :
             <FaFileInvoiceDollar className="me-2" />}
            {getServiceTitle()}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <p className="text-muted mb-4">{getServiceDescription()}</p>
          
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="lg" />
              <p className="mt-3">Loading {getServiceTitle()}...</p>
            </div>
          )}
          
          {error && (
            <Alert variant="danger" className="text-center">
              <FaExclamationTriangle className="me-2" />
              {error}
              <Button variant="outline-danger" size="sm" className="ms-3" onClick={fetchData}>
                Try Again
              </Button>
            </Alert>
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
              <Row>
                {serviceType === 'tax' 
                  ? data.map(renderNotificationCard)
                  : data.map(renderSchemeCard)
                }
              </Row>
              
              {totalPages > 1 && (
                <div className="mt-4 d-flex justify-content-center">
                  <Pagination>
                    <Pagination.Prev 
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item 
                        key={index + 1} 
                        active={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Item Details Modal */}
      {renderItemDetails()}
    </>
  );
};

export default ServiceDetails; 