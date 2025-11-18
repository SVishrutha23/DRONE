import React, { useRef, useEffect, useState } from 'react';

function ImageViewer({ imageUrl, features = [], selectedFeature, onFeatureSelect }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
        imageRef.current = img;
        drawFeatures();
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageLoaded) {
      drawFeatures();
    }
  }, [features, selectedFeature, imageLoaded]);

  const drawFeatures = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image
    ctx.drawImage(img, 0, 0);

    // Draw features
    features.forEach((feature) => {
      const [x, y, x2, y2] = feature.coordinates || [];
      if (x !== undefined && y !== undefined && x2 !== undefined && y2 !== undefined) {
        const isSelected = selectedFeature && selectedFeature.id === feature.id;
        
        // Get color based on feature type
        const colors = {
          building: { border: '#dc3545', fill: 'rgba(220, 53, 69, 0.2)' },
          road: { border: '#6c757d', fill: 'rgba(108, 117, 125, 0.2)' },
          vegetation: { border: '#28a745', fill: 'rgba(40, 167, 69, 0.2)' },
          water: { border: '#007bff', fill: 'rgba(0, 123, 255, 0.2)' }
        };

        const color = colors[feature.type] || { border: '#000', fill: 'rgba(0, 0, 0, 0.2)' };
        const borderWidth = isSelected ? 4 : 2;

        // Draw rectangle
        ctx.fillStyle = color.fill;
        ctx.fillRect(x, y, x2 - x, y2 - y);
        
        ctx.strokeStyle = color.border;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, x2 - x, y2 - y);

        // Draw label
        ctx.fillStyle = color.border;
        ctx.font = '14px Arial';
        ctx.fillText(feature.type.toUpperCase(), x, y - 5);
      }
    });
  };

  if (!imageUrl) {
    return <div className="text-center p-5">No image to display</div>;
  }

  return (
    <div className="image-container" style={{ position: 'relative', display: 'inline-block' }}>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer'
        }}
        onClick={(e) => {
          // Handle click on feature (simplified)
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Find clicked feature (simplified bounding box check)
          const clickedFeature = features.find(f => {
            const [fx, fy, fx2, fy2] = f.coordinates || [];
            return x >= fx && x <= fx2 && y >= fy && y <= fy2;
          });
          
          if (clickedFeature && onFeatureSelect) {
            onFeatureSelect(clickedFeature);
          }
        }}
      />
    </div>
  );
}

export default ImageViewer;

