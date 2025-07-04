import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AboutModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>About PGIP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <img src="/assets/logo.png" alt="PGIP Logo" style={{ height: '80px' }} className="mb-3" />
          <h4>Personalized Government Info Portal</h4>
          <p className="text-muted">Your Gateway to Government Services</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5><i className="fas fa-bullseye me-2 text-primary"></i>Our Mission</h5>
            <p>
              To provide personalized access to government schemes, services, and information 
              to every citizen of India, making government services more accessible and user-friendly.
            </p>

            <h5><i className="fas fa-eye me-2 text-primary"></i>Our Vision</h5>
            <p>
              To become the most trusted and comprehensive platform for government information, 
              ensuring no citizen is left behind in accessing government benefits and services.
            </p>
          </div>

          <div className="col-md-6">
            <h5><i className="fas fa-chart-line me-2 text-primary"></i>What We Offer</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-check text-success me-2"></i>Personalized scheme recommendations</li>
              <li><i className="fas fa-check text-success me-2"></i>Real-time notifications and alerts</li>
              <li><i className="fas fa-check text-success me-2"></i>Document checklist and guidance</li>
              <li><i className="fas fa-check text-success me-2"></i>Multi-language support</li>
              <li><i className="fas fa-check text-success me-2"></i>Mobile-friendly interface</li>
              <li><i className="fas fa-check text-success me-2"></i>24/7 customer support</li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <h5><i className="fas fa-users me-2 text-primary"></i>Our Team</h5>
          <p>
            PGIP is developed and maintained by a dedicated team of government officials, 
            technologists, and domain experts committed to digital transformation and 
            citizen empowerment.
          </p>
        </div>

        <div className="mt-4">
          <h5><i className="fas fa-shield-alt me-2 text-primary"></i>Security & Privacy</h5>
          <p>
            We prioritize the security and privacy of your data. All information is encrypted 
            and stored securely in compliance with government security standards and data protection laws.
          </p>
        </div>

        <div className="mt-4 text-center">
          <h6>Version: 1.0.0</h6>
          <p className="text-muted">© 2024 Government of India. All rights reserved.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AboutModal; 