# AccessAI Backend API

**AI-Powered Accessibility Communication Platform**

A production-ready Node.js Express API for the AccessAI hackathon project, providing multi-modal accessibility features for deaf, speech-impaired, and dyslexia communities.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

The API will be available at `http://localhost:3000`

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. **POST /api/process-input**
Main processing endpoint - receives user input and returns multi-modal outputs.

**Request:**
```json
{
  "text": "Hello, how are you doing today?",
  "user_type": "deaf",
  "language": "en",
  "accessibility_preferences": {
    "sign_language_variant": "ISL",
    "font_size": 16,
    "high_contrast": false,
    "bionic_reading": false,
    "reading_speed": 1.0
  }
}
```

**Response:** *(see full spec in project requirements)*

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/process-input \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you doing today?",
    "user_type": "deaf",
    "language": "en"
  }'
```

---

### 2. **POST /api/text-to-speech**
Convert text to speech in multiple languages and voices.

**Request:**
```json
{
  "text": "Please help me, I need medical assistance",
  "language": "en",
  "gender": "female",
  "speed": 1.0,
  "format": "mp3"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/text-to-speech \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Please help me",
    "language": "en",
    "gender": "female"
  }'
```

---

### 3. **POST /api/translate**
Translate text to multiple target languages.

**Request:**
```json
{
  "text": "Climate change is affecting our planet",
  "source_language": "en",
  "target_languages": ["hi", "es", "ta", "zh"],
  "include_audio": true
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Climate change is affecting our planet",
    "source_language": "en",
    "target_languages": ["hi", "es"]
  }'
```

---

### 4. **GET /api/sample-queries**
Get pre-made demo queries for showcasing the app.

**cURL Example:**
```bash
curl http://localhost:3000/api/sample-queries
```

---

### 5. **GET /api/sign-language/vocabulary**
Get sign language video database.

**Query Parameters:**
- `variant`: ISL | ASL | BSL (default: ISL)
- `category`: greetings | emotions | medical | emergency | social | education
- `search`: search term
- `limit`: 50 (default)
- `offset`: 0

**cURL Example:**
```bash
curl "http://localhost:3000/api/sign-language/vocabulary?variant=ISL&category=greetings&limit=10"
```

---

### 6. **POST /api/dyslexia/format**
Format text for dyslexia-friendly reading.

**Request:**
```json
{
  "text": "Photosynthesis is the process by which plants convert light energy",
  "preferences": {
    "font_size": 16,
    "show_syllables": true,
    "show_pos_colors": true,
    "bionic_reading": false,
    "line_height": 1.8,
    "letter_spacing": 0.15
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/dyslexia/format \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Photosynthesis is the process by which plants convert light energy"
  }'
```

---

### 7. **GET /api/languages**
Get list of supported languages.

**cURL Example:**
```bash
curl http://localhost:3000/api/languages
```

---

### 8. **GET /api/accessibility-statement**
Get WCAG 2.1 compliance information.

**cURL Example:**
```bash
curl http://localhost:3000/api/accessibility-statement
```

---

### 9. **GET /api/health**
Health check endpoint.

**cURL Example:**
```bash
curl http://localhost:3000/api/health
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL_SECONDS=7200
```

---

## 📦 Project Structure

```
accessai-backend/
├── server.js                 # Main entry point
├── package.json              # Dependencies
├── .env.example              # Environment template
├── README.md                 # Documentation
├── routes/
│   └── api.js                # API routes
├── controllers/
│   ├── processingController.js
│   └── apiControllers.js
├── middleware/
│   ├── errorHandler.js
│   ├── requestLogger.js
│   └── validationMiddleware.js
├── utils/
│   ├── signLanguageDB.js     # Mock database
│   ├── sampleQueries.js
│   └── helpers.js
└── config/
    └── constants.js
```

---

## 🧪 Testing

### Test All Endpoints

Use the provided test script or Postman collection.

**Quick Test:**
```bash
# Test health check
curl http://localhost:3000/api/health

# Test process-input
curl -X POST http://localhost:3000/api/process-input \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "user_type": "deaf", "language": "en"}'

# Test sample queries
curl http://localhost:3000/api/sample-queries
```

---

## 🚀 Deployment

### Replit Deployment

1. Create a new Replit project
2. Upload all files
3. Set environment variables in Replit Secrets
4. Click "Run" - Replit auto-deploys
5. Your API will be live at: `https://your-replit-name.replit.dev`

### Environment Variables for Replit
```
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RATE_LIMIT_MAX_REQUESTS=100
```

### Testing Live API
```bash
curl https://your-replit-name.replit.dev/api/health
```

---

## 📊 Performance

**Target Response Times:**
- `/api/process-input`: <300ms
- `/api/translate`: <200ms
- `/api/text-to-speech`: <500ms
- `/api/sample-queries`: <50ms

**Optimization:**
- In-memory caching (2-hour TTL)
- Request validation
- Rate limiting (100 req/min)

---

## 🔐 Security

- **Input sanitization**: All text inputs sanitized
- **Rate limiting**: 100 requests per minute
- **CORS**: Configurable origins
- **Error handling**: No internal details exposed in production

---

## 🌐 Supported Languages

English (en), Hindi (hi), Spanish (es), Tamil (ta), Telugu (te), Kannada (kn), Chinese (zh), Japanese (ja), French (fr), German (de), Arabic (ar), Portuguese (pt)

**Sign Language Variants:**
- ISL (Indian Sign Language)
- ASL (American Sign Language)
- BSL (British Sign Language)

---

## 📝 Response Format

All endpoints return consistent JSON responses:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": "Additional details"
  }
}
```

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env
PORT=3001
```

**CORS errors:**
```bash
# Add your frontend URL to ALLOWED_ORIGINS in .env
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.vercel.app
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Replit Deployment Guide](https://docs.replit.com/)

---

## 🤝 Contributing

This is a hackathon project. For production use:
1. Replace mock data with real APIs
2. Add database integration
3. Implement authentication
4. Add comprehensive testing
5. Set up CI/CD pipeline

---

## 📄 License

MIT License - Free for hackathon and educational use

---

## 👥 Team

AccessAI Hackathon Team

**Contact:** [Your Email]

---

## ⭐ Acknowledgments

Built for the AccessAI hackathon - empowering accessibility through technology.

---

**Happy Coding! 🚀**
