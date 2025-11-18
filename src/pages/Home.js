import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Drone Feature Extraction System</h1>
        <p className="lead">
          AI-powered feature identification and extraction from drone orthophotos
        </p>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>📤 Upload Images</Card.Title>
              <Card.Text>
                Upload your drone orthophotos to begin feature extraction
              </Card.Text>
              <Button as={Link} to="/upload" variant="primary">
                Upload Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>⚙️ Process</Card.Title>
              <Card.Text>
                Process images using AI model to extract features
              </Card.Text>
              <Button as={Link} to="/process" variant="primary">
                Process Images
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>📊 View Results</Card.Title>
              <Card.Text>
                View extracted features and analysis results
              </Card.Text>
              <Button as={Link} to="/results" variant="primary">
                View Results
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <h4>System Overview</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Features Identified:</h5>
              <ul>
                <li>🏢 Buildings</li>
                <li>🛣️ Roads</li>
                <li>🌳 Vegetation</li>
                <li>💧 Water Bodies</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Key Capabilities:</h5>
              <ul>
                <li>Automated feature detection</li>
                <li>High accuracy classification</li>
                <li>Visual feature overlay</li>
                <li>Export results in multiple formats</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;

