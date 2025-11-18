import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Row, Col, Button, Alert } from 'react-bootstrap';
import ImageViewer from '../components/ImageViewer';
import FeatureList from '../components/FeatureList';
import { getResults } from '../services/api';

function Results() {
  const [imageUrl, setImageUrl] = useState(null);
  const [features, setFeatures] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      // Try to get results from localStorage first (for demo)
      const savedResults = localStorage.getItem('extractionResults');
      const savedImageUrl = localStorage.getItem('currentImageUrl');
      
      if (savedResults) {
        const results = JSON.parse(savedResults);
        setFeatures(results.features || []);
        setMetrics(results.metrics || null);
        setImageUrl(savedImageUrl);
        setLoading(false);
        return;
      }

      // Otherwise, try to fetch from API
      const imageId = localStorage.getItem('currentImageId');
      if (imageId) {
        const response = await getResults(imageId);
        if (response.data) {
          setFeatures(response.data.features || []);
          setMetrics(response.data.metrics || null);
          setImageUrl(localStorage.getItem('currentImageUrl'));
        }
      }
    } catch (error) {
      console.error('Error loading results:', error);
      // Use mock data for demonstration
      setFeatures(getMockFeatures());
      setMetrics(getMockMetrics());
      setImageUrl(localStorage.getItem('currentImageUrl'));
    } finally {
      setLoading(false);
    }
  };

  const getMockFeatures = () => {
    return [
      { id: 1, type: 'building', confidence: 0.95, area: 1250, coordinates: [100, 100, 200, 200] },
      { id: 2, type: 'road', confidence: 0.88, area: 3200, coordinates: [300, 150, 500, 180] },
      { id: 3, type: 'vegetation', confidence: 0.92, area: 4500, coordinates: [150, 300, 400, 500] },
      { id: 4, type: 'water', confidence: 0.87, area: 2800, coordinates: [500, 400, 700, 600] },
      { id: 5, type: 'building', confidence: 0.91, area: 980, coordinates: [600, 200, 750, 350] },
    ];
  };

  const getMockMetrics = () => {
    return {
      accuracy: 0.92,
      precision: 0.89,
      recall: 0.91,
      f1Score: 0.90,
      totalFeatures: 5,
      processingTime: 12.5
    };
  };

  const getFeatureTypeColor = (type) => {
    const colors = {
      building: 'danger',
      road: 'secondary',
      vegetation: 'success',
      water: 'primary'
    };
    return colors[type] || 'info';
  };

  const getFeatureTypeIcon = (type) => {
    const icons = {
      building: '🏢',
      road: '🛣️',
      vegetation: '🌳',
      water: '💧'
    };
    return icons[type] || '📍';
  };

  const handleExport = (format) => {
    const data = {
      features: features,
      metrics: metrics,
      timestamp: new Date().toISOString()
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extraction_results.json';
      a.click();
    } else if (format === 'csv') {
      // Simple CSV export
      let csv = 'Type,Confidence,Area\n';
      features.forEach(f => {
        csv += `${f.type},${f.confidence},${f.area}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extraction_results.csv';
      a.click();
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading results...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Extraction Results</h2>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={() => handleExport('json')}>
            Export JSON
          </Button>
          <Button variant="outline-success" onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
        </div>
      </div>

      {metrics && (
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Accuracy</Card.Title>
                <h3>{(metrics.accuracy * 100).toFixed(1)}%</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Precision</Card.Title>
                <h3>{(metrics.precision * 100).toFixed(1)}%</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Recall</Card.Title>
                <h3>{(metrics.recall * 100).toFixed(1)}%</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>F1-Score</Card.Title>
                <h3>{(metrics.f1Score * 100).toFixed(1)}%</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Image with Feature Overlays</h4>
            </Card.Header>
            <Card.Body>
              {imageUrl ? (
                <ImageViewer 
                  imageUrl={imageUrl} 
                  features={features}
                  selectedFeature={selectedFeature}
                  onFeatureSelect={setSelectedFeature}
                />
              ) : (
                <Alert variant="warning">No image available</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Detected Features ({features.length})</h4>
            </Card.Header>
            <Card.Body>
              <FeatureList 
                features={features}
                selectedFeature={selectedFeature}
                onFeatureSelect={setSelectedFeature}
              />
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>
              <h4>Feature Summary</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Count</th>
                    <th>Total Area</th>
                  </tr>
                </thead>
                <tbody>
                  {['building', 'road', 'vegetation', 'water'].map(type => {
                    const typeFeatures = features.filter(f => f.type === type);
                    const totalArea = typeFeatures.reduce((sum, f) => sum + f.area, 0);
                    return (
                      <tr key={type}>
                        <td>
                          {getFeatureTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                        </td>
                        <td>{typeFeatures.length}</td>
                        <td>{totalArea.toLocaleString()} sq units</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Results;

