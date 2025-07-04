import React, { useState } from 'react';
import ServiceDetails from './ServiceDetails';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'schemes',
      icon: 'fas fa-bullhorn',
      title: 'Schemes',
      description: 'Find schemes relevant to your profile.',
      gradient: 'linear-gradient(135deg, #fcb045, #fd1d1d)'
    },
    {
      id: 'exams',
      icon: 'fas fa-graduation-cap',
      title: 'Exams',
      description: 'Get notifications for competitive exams.',
      gradient: 'linear-gradient(135deg, #1d976c, #93f9b9)'
    },
    {
      id: 'tax',
      icon: 'fas fa-file-invoice-dollar',
      title: 'Tax Updates',
      description: 'Stay informed about tax-related updates.',
      gradient: 'linear-gradient(135deg, #00c6ff, #0072ff)'
    }
  ];

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleExploreClick = (e, serviceId) => {
    e.stopPropagation(); // Prevent card click
    setSelectedService(serviceId);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="container mt-5">
        <h2 className="text-center fw-bold">Highlights of Services</h2>
        <div className="row mt-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-4">
              <div 
                className="card service-card text-center shadow-lg" 
                style={{ background: service.gradient, cursor: 'pointer' }}
                onClick={() => handleServiceClick(service.id)}
              >
                <i className={`${service.icon} fa-3x mb-3 text-white`}></i>
                <h5 className="text-white">{service.title}</h5>
                <p className="text-light">{service.description}</p>
                <div className="mt-3">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={(e) => handleExploreClick(e, service.id)}
                  >
                    Explore <i className="fas fa-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <ServiceDetails 
          serviceType={selectedService} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default Services; 