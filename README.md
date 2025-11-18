# Drone Feature Extraction Frontend

A React-based frontend application for AI-powered feature extraction from drone orthophotos.

## Features

- 📤 **Image Upload**: Upload drone orthophotos (JPEG, PNG, TIFF)
- ⚙️ **Image Processing**: Process images using AI model to extract features
- 📊 **Results Visualization**: View extracted features with color-coded overlays
- 📈 **Metrics Display**: View model performance metrics (accuracy, precision, recall, F1-score)
- 📥 **Export Results**: Export results in JSON or CSV format

## Technology Stack

- **React.js** - UI framework
- **React Router** - Navigation
- **Bootstrap & React Bootstrap** - Styling
- **Axios** - API communication
- **HTML5 Canvas** - Feature visualization

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

Or set environment variable:
```bash
REACT_APP_API_URL=http://your-backend-url/api npm start
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ImageUploader.js
│   ├── ImageViewer.js
│   └── FeatureList.js
├── pages/           # Page components
│   ├── Home.js
│   ├── Upload.js
│   ├── Process.js
│   └── Results.js
├── services/        # API services
│   └── api.js
├── App.js           # Main app component
└── index.js         # Entry point
```

## Usage

1. **Upload**: Navigate to Upload page and select/upload a drone orthophoto
2. **Process**: Go to Process page and click "Extract Features"
3. **View Results**: Check Results page to see extracted features and metrics

## Features Extracted

- 🏢 Buildings
- 🛣️ Roads
- 🌳 Vegetation
- 💧 Water Bodies

## Notes

- The frontend uses localStorage for demo purposes. In production, integrate with a proper backend API.
- Mock data is used when API is not available for demonstration.

