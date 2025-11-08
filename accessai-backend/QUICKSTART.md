# AccessAI Backend - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd accessai-backend
npm install
```

### 2. Start Server
```bash
npm start
```

You should see:
```
============================================================
🚀 AccessAI API Server
============================================================
📡 Server running on: http://localhost:3000
🌍 Environment: development
💾 Cache TTL: 7200 seconds
🔒 Rate limit: 100 requests per 60s
============================================================
```

### 3. Test API (Open New Terminal)

#### Test 1: Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected:** `{"success":true,"status":"healthy",...}`

#### Test 2: Process Input (Main Endpoint)
```bash
curl -X POST http://localhost:3000/api/process-input \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how are you doing today?",
    "user_type": "deaf",
    "language": "en"
  }'
```

**Expected:** Large JSON with sign_language, formatted_text, audio, translations

#### Test 3: Sample Queries
```bash
curl http://localhost:3000/api/sample-queries
```

**Expected:** List of sample queries for deaf, speech, dyslexia users

#### Test 4: Languages
```bash
curl http://localhost:3000/api/languages
```

**Expected:** List of 12+ supported languages

#### Test 5: Sign Language Vocabulary
```bash
curl "http://localhost:3000/api/sign-language/vocabulary?variant=ISL&limit=5"
```

**Expected:** 5 sign language video entries

## 🧪 Full Test Suite

### Copy-Paste Test Script
Save as `test-api.sh` and run with `bash test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

echo "Testing AccessAI API..."
echo ""

echo "1. Health Check"
curl -s $BASE_URL/api/health | json_pp
echo -e "\n---\n"

echo "2. Process Input"
curl -s -X POST $BASE_URL/api/process-input \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","user_type":"deaf","language":"en"}' | json_pp
echo -e "\n---\n"

echo "3. Text-to-Speech"
curl -s -X POST $BASE_URL/api/text-to-speech \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","language":"en"}' | json_pp
echo -e "\n---\n"

echo "4. Translate"
curl -s -X POST $BASE_URL/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","source_language":"en","target_languages":["hi","es"]}' | json_pp
echo -e "\n---\n"

echo "5. Sample Queries"
curl -s $BASE_URL/api/sample-queries | json_pp
echo -e "\n---\n"

echo "6. Languages"
curl -s $BASE_URL/api/languages | json_pp
echo -e "\n---\n"

echo "All tests complete!"
```

## 🚀 Deployment to Replit

### Step 1: Create Replit Project
1. Go to https://replit.com
2. Click "Create Repl"
3. Choose "Node.js"
4. Name it "accessai-backend"

### Step 2: Upload Files
Upload all files from `accessai-backend/` folder

### Step 3: Configure Replit
In `.replit` file (create if not exists):
```
run = "npm start"
entrypoint = "server.js"

[packager]
language = "nodejs"

[packager.features]
packageSearch = true
guessImports = true

[languages.javascript]
pattern = "**/*.js"
syntax = "javascript"

[languages.javascript.languageServer]
start = "typescript-language-server --stdio"
```

### Step 4: Set Environment Variables
In Replit Secrets (left sidebar):
```
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 5: Run
Click "Run" button - Replit will install dependencies and start server

### Step 6: Test Live API
```bash
curl https://your-replit-name.replit.dev/api/health
```

## 📊 Performance Benchmarks

Expected response times:
- `/api/health`: ~10ms
- `/api/sample-queries`: ~20ms
- `/api/languages`: ~15ms
- `/api/process-input`: ~150-250ms
- `/api/translate`: ~100-180ms
- `/api/text-to-speech`: ~80-150ms

## 🐛 Common Issues

### Port 3000 already in use
```bash
# Option 1: Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Option 2: Change port
export PORT=3001
npm start
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### CORS errors
Add your frontend URL to `.env`:
```
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.vercel.app
```

## 📝 Next Steps

1. ✅ Backend is running
2. 🎨 Build frontend with React/Next.js
3. 🔗 Connect frontend to this API
4. 🚀 Deploy both to production
5. 🎉 Demo at hackathon!

## 💡 Tips for Hackathon

- Keep server running in background
- Use Postman for easier API testing
- Monitor server logs for errors
- Check `/api/health` frequently
- Use sample queries for quick demos
- Show judges the API documentation (README.md)

## 🆘 Need Help?

1. Check logs in terminal
2. Test with curl commands above
3. Verify .env file exists
4. Ensure port 3000 is free
5. Check Node.js version (18+)

---

**You're all set! 🎉**
