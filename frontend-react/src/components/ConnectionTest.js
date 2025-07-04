import React, { useState, useEffect } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';

const ConnectionTest = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setBackendStatus('connected');
        setApiData(data);
      } else {
        setBackendStatus('error');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      setBackendStatus('error');
    }
  };

  const testSchemesAPI = async () => {
    try {
      const response = await fetch('/api/schemes');
      if (response.ok) {
        const data = await response.json();
        alert(`Found ${data.schemes?.length || 0} schemes in database!`);
      } else {
        alert('Failed to fetch schemes');
      }
    } catch (error) {
      alert('Error connecting to schemes API');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>Backend Connection Test</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <strong className="me-3">Backend Status:</strong>
          {backendStatus === 'checking' && (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {backendStatus === 'connected' && (
            <Alert variant="success" className="mb-0 py-1 px-2">
              ✅ Connected
            </Alert>
          )}
          {backendStatus === 'error' && (
            <Alert variant="danger" className="mb-0 py-1 px-2">
              ❌ Connection Failed
            </Alert>
          )}
        </div>

        {apiData && (
          <div className="mb-3">
            <strong>API Response:</strong>
            <pre className="bg-light p-2 rounded mt-2">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}

        <div className="d-flex gap-2">
          <Button onClick={testBackendConnection} variant="outline-primary" size="sm">
            Test Connection
          </Button>
          <Button onClick={testSchemesAPI} variant="outline-success" size="sm">
            Test Schemes API
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ConnectionTest; 