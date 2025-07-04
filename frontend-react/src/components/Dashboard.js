import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';

const Dashboard = ({ userProfile }) => {
  const [schemes, setSchemes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      
      // Fetch personalized schemes
      const schemesResponse = await fetch('/api/schemes/personalized/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch notifications
      const notificationsResponse = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (schemesResponse.ok) {
        const schemesData = await schemesResponse.json();
        setSchemes(schemesData.schemes || []);
      }

      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load your personalized data');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => 
            notif._id === notificationId 
              ? { ...notif, isRead: true }
              : notif
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading your personalized dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <h2 className="mb-4">Welcome back, {userProfile?.name}!</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Personalized Schemes */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Recommended Schemes for You</h5>
            </Card.Header>
            <Card.Body>
              {schemes.length > 0 ? (
                schemes.map((scheme) => (
                  <Card key={scheme._id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="card-title">{scheme.name}</h6>
                          <p className="card-text text-muted">{scheme.description}</p>
                          <div className="mb-2">
                            <Badge bg="primary" className="me-2">{scheme.category}</Badge>
                            <Badge bg="success" className="me-2">{scheme.state}</Badge>
                            {scheme.eligibility && typeof scheme.eligibility === 'object' ? (
                              <div className="mt-2">
                                <small className="text-muted">
                                  <strong>Eligibility:</strong><br />
                                  {scheme.eligibility.age && `Age: ${scheme.eligibility.age.min || 0}-${scheme.eligibility.age.max || 'Any'}`}<br />
                                  {scheme.eligibility.income && `Income: Up to ₹${scheme.eligibility.income.max?.toLocaleString() || 'Any'}`}<br />
                                  {scheme.eligibility.occupation && `Occupation: ${Array.isArray(scheme.eligibility.occupation) ? scheme.eligibility.occupation.join(', ') : scheme.eligibility.occupation}`}<br />
                                  {scheme.eligibility.education && `Education: ${scheme.eligibility.education}`}
                                </small>
                              </div>
                            ) : (
                              <Badge bg="info">{scheme.eligibility}</Badge>
                            )}
                          </div>
                          <p className="card-text">
                            <small className="text-muted">
                              Benefits: {scheme.benefits}
                            </small>
                          </p>
                        </div>
                        <Button variant="outline-primary" size="sm">
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No personalized schemes available at the moment.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* User Profile Summary */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Your Profile</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {userProfile?.name}</p>
              <p><strong>Email:</strong> {userProfile?.email}</p>
              <p><strong>Location:</strong> {userProfile?.city}, {userProfile?.state}</p>
              <p><strong>Occupation:</strong> {userProfile?.occupation || 'Not specified'}</p>
              <Button variant="outline-secondary" size="sm">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>

          {/* Notifications */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Notifications</h5>
            </Card.Header>
            <Card.Body>
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification._id} 
                    className={`p-2 mb-2 rounded ${!notification.isRead ? 'bg-light' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => markNotificationAsRead(notification._id)}
                  >
                    <p className="mb-1 small">{notification.message}</p>
                    <small className="text-muted">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))
              ) : (
                <p className="text-muted">No notifications</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 