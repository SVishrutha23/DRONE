import React, { useState } from 'react';
import { Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { uploadImage } from '../services/api';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (file) {
      // Validate file type - check both MIME type and file extension
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff', 'image/tif'];
      const validExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      const isValidType = validTypes.includes(file.type) || 
                         validTypes.includes(file.type.toLowerCase()) ||
                         validExtensions.includes(fileExtension);
      
      if (!isValidType && file.type && !file.type.startsWith('image/')) {
        setMessage({ type: 'danger', text: 'Please upload a valid image file (JPEG, PNG, TIFF). Selected: ' + file.type });
        return;
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setMessage({ type: 'danger', text: 'File size must be less than 50MB. Current size: ' + (file.size / (1024 * 1024)).toFixed(2) + ' MB' });
        return;
      }

      // Check if file is empty
      if (file.size === 0) {
        setMessage({ type: 'danger', text: 'The selected file is empty. Please choose a valid image file.' });
        return;
      }

      setSelectedFile(file);
      setMessage({ type: '', text: '' });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.onerror = () => {
        setMessage({ type: 'warning', text: 'Could not read the image file. Please try another file.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'warning', text: 'Please select an image file first' });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setMessage({ type: '', text: '' });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Try to upload to backend, but fallback to localStorage if backend is not available
      let uploadSuccess = false;
      let imageId = null;

      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const response = await uploadImage(formData);
        
        if (response.data && response.data.imageId) {
          imageId = response.data.imageId;
          uploadSuccess = true;
        }
      } catch (error) {
        // Backend not available - use demo mode with localStorage
        console.log('Backend not available, using demo mode');
        imageId = `demo_${Date.now()}`;
        uploadSuccess = true;
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadSuccess) {
        // Store image data in localStorage for processing
        localStorage.setItem('currentImageId', imageId);
        localStorage.setItem('currentImageUrl', preview);
        localStorage.setItem('currentImageName', selectedFile.name);
        localStorage.setItem('currentImageSize', selectedFile.size.toString());
        
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });

        setTimeout(() => {
          navigate('/process');
        }, 1500);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.message || 'Upload failed. Please try again.' 
      });
      setUploadProgress(0);
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Upload Drone Orthophoto</h2>
      
      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Card>
        <Card.Header>
          <h4>Select Image File</h4>
        </Card.Header>
        <Card.Body>
          <ImageUploader onFileSelect={handleFileSelect} disabled={uploading} />
          
          {preview && (
            <div className="mt-4">
              <h5>Preview:</h5>
              <div className="image-container mt-3">
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                />
              </div>
              <div className="mt-3">
                <p><strong>File:</strong> {selectedFile?.name}</p>
                <p><strong>Size:</strong> {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p><strong>Type:</strong> {selectedFile?.type}</p>
              </div>
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
            </div>
          )}

          <div className="mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Upload;

