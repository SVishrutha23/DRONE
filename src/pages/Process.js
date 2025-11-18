import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ImageViewer from '../components/ImageViewer';
import { processImage, getProcessingStatus } from '../services/api';

function Process() {
  const [imageUrl, setImageUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Load image from localStorage
    const savedImageUrl = localStorage.getItem('currentImageUrl');
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    } else {
      setMessage({ type: 'warning', text: 'No image found. Please upload an image first.' });
    }
  }, []);

  const handleProcess = async () => {
    const imageId = localStorage.getItem('currentImageId');
    if (!imageId) {
      setMessage({ type: 'warning', text: 'No image ID found. Please upload an image first.' });
      return;
    }

    setProcessing(true);
    setStatus('Initializing...');
    setMessage({ type: '', text: '' });

    try {
      // Start processing
      const response = await processImage(imageId);
      
      if (response.data && response.data.jobId) {
        setStatus('Processing image...');
        
        // Poll for status (simplified - in real app, use WebSocket or better polling)
        const pollStatus = async () => {
          try {
            const statusResponse = await getProcessingStatus(response.data.jobId);
            
            if (statusResponse.data.status === 'completed') {
              setStatus('Processing complete!');
              setMessage({ type: 'success', text: 'Feature extraction completed successfully!' });
              
              // Store results
              if (statusResponse.data.results) {
                localStorage.setItem('extractionResults', JSON.stringify(statusResponse.data.results));
              }
              
              setTimeout(() => {
                navigate('/results');
              }, 2000);
            } else if (statusResponse.data.status === 'failed') {
              setStatus('Processing failed');
              setMessage({ type: 'danger', text: 'Processing failed. Please try again.' });
              setProcessing(false);
            } else {
              setStatus(statusResponse.data.status || 'Processing...');
              setTimeout(pollStatus, 2000);
            }
          } catch (error) {
            setStatus('Error checking status');
            setMessage({ type: 'danger', text: 'Error checking processing status.' });
            setProcessing(false);
          }
        };

        // Start polling after a delay
        setTimeout(pollStatus, 2000);
      }
    } catch (error) {
      setStatus('Error');
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Processing failed. Please try again.' 
      });
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Process Image</h2>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Image Preview</h4>
            </Card.Header>
            <Card.Body>
              {imageUrl ? (
                <ImageViewer imageUrl={imageUrl} />
              ) : (
                <div className="text-center p-5">
                  <p>No image to display. Please upload an image first.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Processing Controls</h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h5>Preprocessing Options:</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="noiseReduction" defaultChecked />
                  <label className="form-check-label" htmlFor="noiseReduction">
                    Noise Reduction
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="normalization" defaultChecked />
                  <label className="form-check-label" htmlFor="normalization">
                    Image Normalization
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="enhancement" />
                  <label className="form-check-label" htmlFor="enhancement">
                    Image Enhancement
                  </label>
                </div>
              </div>

              {status && (
                <Alert variant="info" className="mt-3">
                  <div className="d-flex align-items-center">
                    {processing && <Spinner animation="border" size="sm" className="me-2" />}
                    <span>{status}</span>
                  </div>
                </Alert>
              )}

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mt-3"
                onClick={handleProcess}
                disabled={!imageUrl || processing}
              >
                {processing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  'Extract Features'
                )}
              </Button>

              <div className="mt-4">
                <h6>Features to Extract:</h6>
                <ul>
                  <li>🏢 Buildings</li>
                  <li>🛣️ Roads</li>
                  <li>🌳 Vegetation</li>
                  <li>💧 Water Bodies</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Process;

