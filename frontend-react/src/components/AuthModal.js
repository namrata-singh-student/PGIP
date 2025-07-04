import React, { useState } from 'react';
import { Modal, Button, Form, Tab, Tabs, Alert } from 'react-bootstrap';

const AuthModal = ({ show, onHide, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    occupation: '',
    state: '',
    city: '',
    phone: ''
  });

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Welcome back, ${data.profile.name}!` });
        setTimeout(() => {
          onAuthSuccess(data.token, data.profile);
          setLoginData({ email: '', password: '' });
        }, 1500);
      } else {
        setMessage({ type: 'danger', text: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'danger', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      setMessage({ type: 'danger', text: 'Passwords do not match!' });
      setLoading(false);
      return;
    }

    // Validate password strength
    if (signupData.password.length < 8) {
      setMessage({ type: 'danger', text: 'Password must be at least 8 characters long!' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
          age: signupData.age || undefined,
          occupation: signupData.occupation || '',
          state: signupData.state || '',
          city: signupData.city || '',
          phone: signupData.phone || ''
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! Welcome to PGIP!' });
        setTimeout(() => {
          onAuthSuccess(data.token, data.profile);
          setActiveTab('login');
          setSignupData({
            name: '', email: '', password: '', confirmPassword: '',
            age: '', occupation: '', state: '', city: '', phone: ''
          });
        }, 1500);
      } else {
        setMessage({ type: 'danger', text: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ type: 'danger', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setForgotEmail('');
      } else {
        setMessage({ type: 'danger', text: data.error || 'Failed to send reset email' });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({ type: 'danger', text: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveTab('login');
    setLoginData({ email: '', password: '' });
    setSignupData({
      name: '', email: '', password: '', confirmPassword: '',
      age: '', occupation: '', state: '', city: '', phone: ''
    });
    setForgotEmail('');
    setMessage({ type: '', text: '' });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message.text && (
          <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
            {message.text}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  required
                />
              </Form.Group>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => setActiveTab('forgot')}
                  className="p-0"
                >
                  Forgot Password?
                </Button>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <Form onSubmit={handleSignup}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={signupData.name}
                      onChange={handleSignupInputChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={handleSignupInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Must be at least 8 characters long
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      value={signupData.age}
                      onChange={handleSignupInputChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Select
                      name="occupation"
                      value={signupData.occupation}
                      onChange={handleSignupInputChange}
                    >
                      <option value="">Select occupation</option>
                      <option value="student">Student</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="retired">Retired</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      name="state"
                      value={signupData.state}
                      onChange={handleSignupInputChange}
                    >
                      <option value="">Select state</option>
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="west-bengal">West Bengal</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={signupData.city}
                      onChange={handleSignupInputChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={signupData.phone}
                  onChange={handleSignupInputChange}
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="forgot" title="Forgot Password">
            <Form onSubmit={handleForgotPassword}>
              <div className="text-center mb-4">
                <i className="fas fa-lock fa-3x text-muted mb-3"></i>
                <h5>Reset Your Password</h5>
                <p className="text-muted">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal; 