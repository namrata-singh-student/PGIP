import React, { useState } from 'react';
import { Modal, Button, Accordion } from 'react-bootstrap';

const FAQModal = ({ show, onHide }) => {
  const [activeKey, setActiveKey] = useState('0');

  const faqs = [
    {
      question: "What is PGIP?",
      answer: "PGIP (Personalized Government Info Portal) is a comprehensive platform that provides personalized access to government schemes, services, and information. It helps citizens find relevant government benefits based on their profile and location."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Sign Up' button in the login modal. You'll need to provide your email address, create a password, and fill in your basic profile information including name, age, occupation, and location."
    },
    {
      question: "How does personalization work?",
      answer: "Our system analyzes your profile information including age, occupation, income level, location, and preferences to recommend government schemes that are most relevant to you. The more information you provide, the better our recommendations become."
    },
    {
      question: "Are my personal details secure?",
      answer: "Yes, we take data security very seriously. All your personal information is encrypted and stored securely in compliance with government security standards and data protection laws. We never share your information with third parties without your consent."
    },
    {
      question: "How do I get notifications about new schemes?",
      answer: "Once you're logged in, you can customize your notification preferences in your profile settings. You can choose to receive notifications via email, SMS, or push notifications for new schemes, exam notifications, and important updates."
    },
    {
      question: "What documents do I need to apply for schemes?",
      answer: "Each scheme has different document requirements. When you view a scheme, you'll see a complete checklist of required documents. You can also download application forms and get step-by-step guidance for the application process."
    },
    {
      question: "Is PGIP available in multiple languages?",
      answer: "Yes, PGIP supports multiple Indian languages. You can change the language preference in your profile settings. Currently, we support Hindi, English, and several regional languages with more being added regularly."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team through the 'Contact Us' section. We provide 24/7 customer support via email, phone, and live chat. You can also check our FAQ section for quick answers to common questions."
    },
    {
      question: "Are there any fees to use PGIP?",
      answer: "No, PGIP is completely free to use. It's a government initiative to make government services more accessible to citizens. There are no hidden charges or subscription fees."
    },
    {
      question: "How often is the information updated?",
      answer: "We update our database regularly with the latest government schemes, notifications, and policy changes. New schemes are added as soon as they are announced by the government, and existing information is reviewed and updated monthly."
    }
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Frequently Asked Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <p className="text-muted">
            Find answers to common questions about PGIP and government services.
          </p>
        </div>

        <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <strong>{faq.question}</strong>
              </Accordion.Header>
              <Accordion.Body>
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="mt-4 p-3 bg-light rounded">
          <h6><i className="fas fa-info-circle me-2 text-primary"></i>Still have questions?</h6>
          <p className="mb-2">
            If you couldn't find the answer you're looking for, please contact our support team.
          </p>
          <Button variant="outline-primary" size="sm">
            <i className="fas fa-envelope me-1"></i>Contact Support
          </Button>
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

export default FAQModal; 