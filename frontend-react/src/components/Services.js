import React, { useState } from 'react';
import { FaBullhorn, FaGraduationCap, FaFileInvoiceDollar, FaArrowRight } from 'react-icons/fa';
import ServiceDetails from './ServiceDetails';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'schemes',
      icon: <FaBullhorn />,
      title: 'Schemes',
      description: 'Find schemes relevant to your profile.',
      gradient: 'linear-gradient(135deg, #fcb045, #fd1d1d)'
    },
    {
      id: 'exams',
      icon: <FaGraduationCap />,
      title: 'Exams',
      description: 'Get notifications for competitive exams.',
      gradient: 'linear-gradient(135deg, #1d976c, #93f9b9)'
    },
    {
      id: 'tax',
      icon: <FaFileInvoiceDollar />,
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
                <div className="text-white mb-3" style={{ fontSize: '3rem' }}>
                  {service.icon}
                </div>
                <h5 className="text-white">{service.title}</h5>
                <p className="text-light">{service.description}</p>
                <div className="mt-3">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={(e) => handleExploreClick(e, service.id)}
                  >
                    Explore <FaArrowRight className="ms-1" />
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