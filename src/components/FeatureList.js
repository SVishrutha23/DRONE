import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

function FeatureList({ features, selectedFeature, onFeatureSelect }) {
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

  if (!features || features.length === 0) {
    return <p className="text-muted">No features detected</p>;
  }

  return (
    <ListGroup>
      {features.map((feature) => (
        <ListGroup.Item
          key={feature.id}
          action
          active={selectedFeature && selectedFeature.id === feature.id}
          onClick={() => onFeatureSelect && onFeatureSelect(feature)}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <strong>
                {getFeatureTypeIcon(feature.type)} {feature.type.charAt(0).toUpperCase() + feature.type.slice(1)}
              </strong>
              <br />
              <small className="text-muted">
                Area: {feature.area?.toLocaleString()} sq units
              </small>
            </div>
            <Badge bg={getFeatureTypeColor(feature.type)}>
              {(feature.confidence * 100).toFixed(0)}%
            </Badge>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default FeatureList;

