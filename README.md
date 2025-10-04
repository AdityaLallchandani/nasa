# NASA Biological Science Archive

A sophisticated, NASA-themed web application for browsing and searching biological science research papers. Built with React, Node.js, Express, and Firebase Firestore.

![NASA Bio Archive](https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)

## 🚀 Features

### Frontend
- **NASA-Inspired Design**: Dark, sophisticated theme with official NASA colors
- **Hero Section**: Stunning James Webb Carina Nebula background
- **Real-time Search**: Dynamic search across titles, abstracts, authors, and keywords
- **Advanced Filtering**: Filter by keywords, authors, date ranges
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Frosted-glass effects, smooth animations, loading states
- **Pagination**: Efficient handling of large datasets

### Backend
- **RESTful API**: Express.js server with comprehensive endpoints
- **Firebase Integration**: Firestore database for scalable document storage
- **Advanced Search**: Case-insensitive full-text search capabilities
- **Security**: Helmet, CORS, compression middleware
- **Error Handling**: Comprehensive error handling and validation
- **Production-Ready**: Environment configuration and deployment setup

## 🛠 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS with custom NASA theme
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Development**: Concurrently for parallel dev servers

## 📦 Project Structure

```
nasa-biological-science-archive/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/         # API services
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS and Tailwind styles
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                    # Express backend
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Environment variables
├── package.json            # Root package.json
├── .env.example           # Environment template
└── README.md             # This file
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore enabled
- Firebase service account key

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd nasa-biological-science-archive

# Install all dependencies (root, client, and server)
npm run install:all
```

### 2. Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Generate Service Account Key**:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

3. **Set up Firestore Database**:
   - Create a collection named `papers`
   - Import sample data or add documents manually

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your Firebase credentials
nano .env
```

**Required Environment Variables**:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/

# Option 1: Path to service account key file
GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccountKey.json

# Option 2: Service account key as JSON string (recommended for deployment)
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}

# Client Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Firebase Data Structure

Your Firestore `papers` collection should contain documents with this structure:

```json
{
  "title": "Paper Title",
  "authors": ["Dr. Author One", "Dr. Author Two"],
  "abstract": "Paper abstract text...",
  "publication": "Journal Name",
  "publicationDate": "2024-01-15",
  "keywords": ["keyword1", "keyword2"],
  "pdfUrl": "https://example.com/paper.pdf"
}
```

### 5. Run Development Servers

```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run client:dev  # Runs on http://localhost:5173
npm run server:dev  # Runs on http://localhost:5000
```

## 🏗 API Endpoints

### Papers
- `GET /api/papers` - Get paginated list of papers
  - Query params: `page`, `limit`
- `GET /api/papers/search` - Search papers
  - Query params: `q`, `author`, `startDate`, `endDate`, `keywords`, `page`, `limit`
- `GET /api/papers/:id` - Get specific paper by ID

### Keywords
- `GET /api/keywords` - Get all unique keywords

### Health
- `GET /api/health` - Server health check

## 🚀 Production Deployment

### Build for Production

```bash
# Build the client
npm run client:build

# The built files will be in client/dist/
```

### Environment Variables for Production

Set these environment variables in your hosting platform:

```env
NODE_ENV=production
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account",...}
VITE_API_BASE_URL=https://your-api-domain.com/api
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Deployment Options

#### Option 1: Traditional Hosting
1. Deploy the Express server to platforms like Heroku, Railway, or DigitalOcean
2. Deploy the built React app to platforms like Netlify, Vercel, or AWS S3

#### Option 2: Full-Stack Platforms
- **Render**: Deploy both frontend and backend
- **Railway**: Full-stack deployment with automatic builds
- **Heroku**: Deploy server, use CDN for static files

### Sample Data Import

To populate your Firestore with sample data, you can use the Firebase Admin SDK:

```javascript
const samplePapers = [
  {
    title: "Genomic Adaptation of Microbes to the International Space Station Environment",
    authors: ["Dr. Elena Petrov", "Dr. Kenji Tanaka"],
    abstract: "A comprehensive study of microbial communities aboard the ISS...",
    publication: "Journal of Astrobiology",
    publicationDate: "2024-08-15",
    keywords: ["microgravity", "genomics", "ISS", "adaptation"],
    pdfUrl: "https://example.com/papers/genomic-adaptation.pdf"
  },
  // Add more papers...
];

// Use Firebase Admin to batch import
const batch = db.batch();
samplePapers.forEach(paper => {
  const docRef = db.collection('papers').doc();
  batch.set(docRef, paper);
});
await batch.commit();
```

## 🎨 Customization

### Styling
- Edit `client/tailwind.config.js` for theme customization
- Modify colors, fonts, and animations
- Add custom Tailwind classes

### Components
- All React components are in `client/src/components/`
- Each component is modular and reusable
- Add new components following the existing pattern

### API
- Extend `server/server.js` with new endpoints
- Add middleware in the server configuration
- Implement additional Firebase operations

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**:
   - Verify service account key is correct
   - Check Firestore rules allow read access
   - Ensure project ID matches your Firebase project

2. **CORS Errors**:
   - Update `ALLOWED_ORIGINS` in `.env`
   - Check client URL matches allowed origins

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

4. **Search Not Working**:
   - Verify Firestore has data in `papers` collection
   - Check API endpoints are accessible
   - Review browser network tab for errors

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## 🆘 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review Firebase and React documentation

---

Built with ❤️ for NASA's biological science research community.