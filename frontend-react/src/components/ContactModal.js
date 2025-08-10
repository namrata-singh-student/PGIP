import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ContactModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Thank you for your message! We will get back to you soon.");
      onHide();
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h5>Get in Touch</h5>
            <p>
              Have questions about government schemes or need assistance? We're
              here to help!
            </p>

            <div className="mt-4">
              <h6>
                <i className="fas fa-envelope me-2"></i>Email
              </h6>
              <p>support@pgip.gov.in</p>
              <p>namratasingh2308@gmail.com</p>
              <h6>
                <i className="fas fa-phone me-2"></i>Phone
              </h6>
              <p>6291163760 (Toll Free)</p>

              <h6>
                <i className="fas fa-map-marker-alt me-2"></i>Address
              </h6>
              <p>
                Government of India
                <br />
                New Delhi, India
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject *</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
