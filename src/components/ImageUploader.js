import React, { useRef, useState } from 'react';

function ImageUploader({ onFileSelect, disabled }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDragOver ? '#e7f3ff' : '#f8f9fa',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/tiff,image/tif"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      {isDragOver ? (
        <p>Drop the image here...</p>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Drag & drop an image here, or click to select</strong>
          </p>
          <p className="text-muted small">
            Supported formats: JPEG, PNG, TIFF (Max size: 50MB)
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

