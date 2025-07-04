import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Features = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: 'fas fa-user-check',
      title: 'Personalization',
      description: 'Content tailored to your profile.',
      gradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      details: 'Our advanced personalization system analyzes your profile, location, and preferences to deliver government schemes and updates that are most relevant to you. Get customized recommendations based on your age, occupation, income level, and geographic location.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Alerts',
      description: 'Get timely alerts for updates.',
      gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      details: 'Stay informed with real-time notifications about new government schemes, exam notifications, tax updates, and important deadlines. Customize your alert preferences to receive updates via email, SMS, or push notifications.'
    },
    {
      icon: 'fas fa-clipboard-check',
      title: 'Document Checklist',
      description: 'Stay prepared with required documents.',
      gradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
      details: 'Never miss important documents again! Our intelligent document checklist system provides you with a comprehensive list of required documents for each government scheme or service, along with step-by-step application guidance.'
    }
  ];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeature(null);
  };

  return (
    <>
      <section id="features" className="features-section mt-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Key Features</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 text-center">
                <div 
                  className="feature-card p-4 shadow-lg" 
                  style={{ background: feature.gradient }}
                  onClick={() => handleFeatureClick(feature)}
                >
                  <i className={`${feature.icon} fa-3x mb-3 text-white`}></i>
                  <h5 className="text-white">{feature.title}</h5>
                  <p className="text-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFeature?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeature?.details}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Features; 