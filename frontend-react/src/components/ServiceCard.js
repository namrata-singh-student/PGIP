import React from 'react';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  category, 
  eligibility, 
  benefits, 
  applicationLink, 
  status = 'active',
  priority = 'normal',
  onClick 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'expired': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'normal': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="service-card card h-100 border-0 shadow-sm" onClick={onClick}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <div className="service-icon me-3" style={{ fontSize: '2rem' }}>
              {icon}
            </div>
            <div>
              <h6 className="card-title mb-1">{title}</h6>
              {category && (
                <span className="badge bg-primary me-2">{category}</span>
              )}
              {status && (
                <span className={`badge bg-${getStatusColor()}`}>{status}</span>
              )}
            </div>
          </div>
          {priority !== 'normal' && (
            <span className={`badge bg-${getPriorityColor()}`}>{priority}</span>
          )}
        </div>
        
        <p className="card-text text-muted mb-3">{description}</p>
        
        {eligibility && (
          <div className="mb-3">
            <small className="text-muted">
              <strong>Eligibility:</strong> {typeof eligibility === 'object' ? 
                `${eligibility.age ? `Age: ${eligibility.age.min || 0}-${eligibility.age.max || 'Any'}` : ''} ${eligibility.income ? `Income: Up to ₹${eligibility.income.max?.toLocaleString() || 'Any'}` : ''} ${eligibility.occupation ? `Occupation: ${Array.isArray(eligibility.occupation) ? eligibility.occupation.join(', ') : eligibility.occupation}` : ''}`.trim() : 
                eligibility
              }
            </small>
          </div>
        )}
        
        {benefits && (
          <div className="mb-3">
            <small className="text-muted">
              <strong>Benefits:</strong> {benefits}
            </small>
          </div>
        )}
        
        <div className="d-flex gap-2 mt-auto">
          <button className="btn btn-primary btn-sm">
            Learn More <FaArrowRight className="ms-1" />
          </button>
          {applicationLink && (
            <button className="btn btn-outline-secondary btn-sm">
              Apply Now <FaExternalLinkAlt className="ms-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 