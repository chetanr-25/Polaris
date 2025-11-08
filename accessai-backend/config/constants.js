// Application constants

module.exports = {
  // Supported languages with metadata
  SUPPORTED_LANGUAGES: [
    { code: 'en', name: 'English', native_name: 'English', tts: true, translation: true, sign_language: true, sign_variants: ['ASL', 'BSL'] },
    { code: 'hi', name: 'Hindi', native_name: 'हिंदी', tts: true, translation: true, sign_language: true, sign_variants: ['ISL'] },
    { code: 'es', name: 'Spanish', native_name: 'Español', tts: true, translation: true, sign_language: false },
    { code: 'ta', name: 'Tamil', native_name: 'தமிழ்', tts: true, translation: true, sign_language: true, sign_variants: ['ISL'] },
    { code: 'te', name: 'Telugu', native_name: 'తెలుగు', tts: true, translation: true, sign_language: true, sign_variants: ['ISL'] },
    { code: 'kn', name: 'Kannada', native_name: 'ಕನ್ನಡ', tts: true, translation: true, sign_language: true, sign_variants: ['ISL'] },
    { code: 'zh', name: 'Chinese', native_name: '中文', tts: true, translation: true, sign_language: false },
    { code: 'ja', name: 'Japanese', native_name: '日本語', tts: true, translation: true, sign_language: false },
    { code: 'fr', name: 'French', native_name: 'Français', tts: true, translation: true, sign_language: false },
    { code: 'de', name: 'German', native_name: 'Deutsch', tts: true, translation: true, sign_language: false },
    { code: 'ar', name: 'Arabic', native_name: 'العربية', tts: true, translation: true, sign_language: false },
    { code: 'pt', name: 'Portuguese', native_name: 'Português', tts: true, translation: true, sign_language: false },
  ],

  // Sign language variants
  SIGN_LANGUAGE_VARIANTS: ['ISL', 'ASL', 'BSL'],

  // User types
  USER_TYPES: ['deaf', 'speech', 'dyslexia'],

  // Parts of speech colors (for dyslexia-friendly formatting)
  POS_COLORS: {
    noun: '#0066cc',
    verb: '#cc0000',
    adjective: '#009933',
    adverb: '#ff9900',
    pronoun: '#9933cc',
    preposition: '#cc6600',
    conjunction: '#666666',
    interjection: '#cc00cc',
    determiner: '#006666',
    default: '#000000'
  },

  // Audio formats
  AUDIO_FORMATS: ['mp3', 'wav', 'ogg'],

  // Error codes
  ERROR_CODES: {
    INVALID_REQUEST: 'INVALID_REQUEST',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    UNSUPPORTED_LANGUAGE: 'UNSUPPORTED_LANGUAGE',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    VALIDATION_ERROR: 'VALIDATION_ERROR'
  },

  // Cache TTL (in seconds)
  CACHE_TTL: {
    PROCESS_INPUT: 7200,      // 2 hours
    TRANSLATION: 14400,       // 4 hours
    VOCABULARY: 86400,        // 24 hours
    TTS: 7200,                // 2 hours
    SAMPLE_QUERIES: 86400     // 24 hours
  },

  // Text constraints
  MIN_TEXT_LENGTH: 1,
  MAX_TEXT_LENGTH: 5000,

  // Speech speed constraints
  MIN_SPEECH_SPEED: 0.5,
  MAX_SPEECH_SPEED: 2.0,

  // WCAG compliance
  WCAG_LEVEL: '2.1 AA',
  TARGET_WCAG_LEVEL: '2.1 AAA',

  // CDN base URL for mock assets
  CDN_BASE_URL: 'https://accessai-cdn.example.com',

  // Sample query categories
  QUERY_CATEGORIES: ['social', 'emergency', 'medical', 'education', 'professional', 'daily']
};
