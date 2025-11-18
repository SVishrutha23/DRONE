import axios from 'axios';

// Base URL for API - update this to match your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload image
export const uploadImage = async (formData) => {
  return await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Process image
export const processImage = async (imageId) => {
  return await api.post('/process', { imageId });
};

// Get processing status
export const getProcessingStatus = async (jobId) => {
  return await api.get(`/status/${jobId}`);
};

// Get results
export const getResults = async (imageId) => {
  return await api.get(`/results/${imageId}`);
};

// Get model metrics
export const getMetrics = async () => {
  return await api.get('/metrics');
};

// Get processing history
export const getHistory = async () => {
  return await api.get('/history');
};

export default api;

