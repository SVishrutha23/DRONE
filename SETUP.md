# Quick Setup Guide

## Installation Steps

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Version 14 or higher recommended

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open Browser**
   - The app will automatically open at http://localhost:3000

## Project Structure

```
DRONE/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ImageUploader.js
│   │   ├── ImageViewer.js
│   │   └── FeatureList.js
│   ├── pages/            # Main pages
│   │   ├── Home.js
│   │   ├── Upload.js
│   │   ├── Process.js
│   │   └── Results.js
│   ├── services/         # API integration
│   │   └── api.js
│   ├── App.js           # Main app component
│   ├── App.css
│   ├── index.js         # Entry point
│   └── index.css
├── package.json
└── README.md
```

## Features

✅ **Home Page** - Overview and navigation
✅ **Upload Page** - Drag & drop image upload
✅ **Process Page** - Image processing with AI model
✅ **Results Page** - Feature visualization and metrics

## API Configuration

Update the API URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

## Demo Mode

The app works in demo mode using localStorage and mock data when the backend is not available.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

