const express = require('express');
const router = express.Router();

const { processInput } = require('../controllers/processingController');
const {
  textToSpeech,
  translate,
  getSampleQueries,
  getSignLanguageVocabulary,
  formatForDyslexia,
  getLanguages,
  getAccessibilityStatement,
  healthCheck
} = require('../controllers/apiControllers');

const {
  validateProcessInput,
  validateTextToSpeech,
  validateTranslate,
  validateDyslexiaFormat
} = require('../middleware/validationMiddleware');

const { asyncHandler } = require('../middleware/errorHandler');

// Health check
router.get('/health', asyncHandler(healthCheck));

// Main processing endpoint
router.post('/process-input', validateProcessInput, asyncHandler(processInput));

// Text-to-speech
router.post('/text-to-speech', validateTextToSpeech, asyncHandler(textToSpeech));

// Translation
router.post('/translate', validateTranslate, asyncHandler(translate));

// Sample queries
router.get('/sample-queries', asyncHandler(getSampleQueries));

// Sign language vocabulary
router.get('/sign-language/vocabulary', asyncHandler(getSignLanguageVocabulary));

// Dyslexia formatting
router.post('/dyslexia/format', validateDyslexiaFormat, asyncHandler(formatForDyslexia));

// Languages list
router.get('/languages', asyncHandler(getLanguages));

// Accessibility statement
router.get('/accessibility-statement', asyncHandler(getAccessibilityStatement));

module.exports = router;
