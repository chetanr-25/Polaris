const { v4: uuidv4 } = require('uuid');
const { CDN_BASE_URL, POS_COLORS } = require('../config/constants');

// Mock translations database
const translations = {
  'Hello, how are you doing today?': {
    hi: 'नमस्ते, आप आज कैसे हैं?',
    es: 'Hola, ¿cómo estás hoy?',
    ta: 'வணக்கம், இன்று எப்படி இருக்கிறீர்கள்?',
    te: 'హలో, ఈరోజు మీరు ఎలా ఉన్నారు?',
    kn: 'ಹಲೋ, ನೀವು ಇಂದು ಹೇಗಿದ್ದೀರಿ?',
    zh: '你好，你今天怎么样？',
    ja: 'こんにちは、今日はどうですか？',
    fr: 'Bonjour, comment allez-vous aujourd\'hui?',
    de: 'Hallo, wie geht es dir heute?',
    ar: 'مرحبا، كيف حالك اليوم؟',
    pt: 'Olá, como você está hoje?'
  },
  'I need emergency medical help': {
    hi: 'मुझे आपातकालीन चिकित्सा सहायता चाहिए',
    es: 'Necesito ayuda médica de emergencia',
    ta: 'எனக்கு அவசர மருத்துவ உதவி தேவை',
    te: 'నాకు అత్యవసర వైద్య సహాయం అవసరం',
    kn: 'ನನಗೆ ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯ ಬೇಕು',
    zh: '我需要紧急医疗帮助',
    ja: '緊急医療支援が必要です',
    fr: 'J\'ai besoin d\'une aide médicale d\'urgence',
    de: 'Ich brauche dringend medizinische Hilfe',
    ar: 'أحتاج إلى مساعدة طبية طارئة',
    pt: 'Preciso de ajuda médica de emergência'
  }
};

// Simple POS tagger (mock implementation)
const posDict = {
  hello: 'interjection',
  hi: 'interjection',
  how: 'adverb',
  are: 'verb',
  you: 'pronoun',
  doing: 'verb',
  today: 'noun',
  i: 'pronoun',
  need: 'verb',
  emergency: 'adjective',
  medical: 'adjective',
  help: 'noun',
  the: 'determiner',
  a: 'determiner',
  an: 'determiner',
  is: 'verb',
  am: 'verb',
  was: 'verb',
  were: 'verb',
  have: 'verb',
  has: 'verb',
  good: 'adjective',
  bad: 'adjective',
  big: 'adjective',
  small: 'adjective',
  and: 'conjunction',
  but: 'conjunction',
  or: 'conjunction',
  in: 'preposition',
  on: 'preposition',
  at: 'preposition',
  to: 'preposition',
  from: 'preposition'
};

/**
 * Tokenize text into words
 * @param {string} text - Input text
 * @returns {array} Array of words
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Get POS tag for a word
 * @param {string} word - Word to tag
 * @returns {string} POS tag
 */
function getPOSTag(word) {
  return posDict[word.toLowerCase()] || 'noun';
}

/**
 * Generate color-coded POS data
 * @param {string} text - Input text
 * @returns {array} Array of word objects with POS and colors
 */
function generatePOSColors(text) {
  const words = text.split(/\s+/);
  return words.map(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    const pos = getPOSTag(cleanWord);
    return {
      word,
      pos,
      color: POS_COLORS[pos] || POS_COLORS.default
    };
  });
}

/**
 * Syllabify text (simple implementation)
 * @param {string} text - Input text
 * @returns {string} Syllabified text
 */
function syllabify(text) {
  const syllableRules = {
    'hello': 'hel-lo',
    'how': 'how',
    'doing': 'do-ing',
    'today': 'to-day',
    'emergency': 'e-mer-gen-cy',
    'medical': 'med-i-cal',
    'photosynthesis': 'pho-to-syn-the-sis',
    'process': 'pro-cess',
    'convert': 'con-vert',
    'energy': 'en-er-gy'
  };
  
  let result = text;
  Object.keys(syllableRules).forEach(word => {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, syllableRules[word]);
  });
  
  return result;
}

/**
 * Calculate reading difficulty
 * @param {string} text - Input text
 * @returns {object} Reading analysis
 */
function analyzeReadability(text) {
  const words = tokenize(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
  
  let difficulty = 'easy';
  let readingLevel = '3rd grade';
  let grade = 3;
  
  if (avgWordsPerSentence > 15) {
    difficulty = 'hard';
    readingLevel = '10th grade';
    grade = 10;
  } else if (avgWordsPerSentence > 10) {
    difficulty = 'medium';
    readingLevel = '7th grade';
    grade = 7;
  }
  
  // Estimate reading time (average 200 words per minute)
  const readingTimeSeconds = Math.ceil((words.length / 200) * 60);
  
  return {
    reading_difficulty: difficulty,
    reading_level: readingLevel,
    flesch_kincaid_grade: grade + 0.2,
    estimated_reading_time_sec: readingTimeSeconds,
    unique_words: new Set(words).size,
    total_words: words.length
  };
}

/**
 * Generate dyslexia-friendly HTML
 * @param {string} text - Input text
 * @param {object} preferences - Formatting preferences
 * @returns {string} Formatted HTML
 */
function generateDyslexiaHTML(text, preferences = {}) {
  const {
    font_size = 16,
    line_height = 1.8,
    letter_spacing = 0.15,
    show_syllables = false,
    show_pos_colors = true,
    bionic_reading = false
  } = preferences;
  
  let formattedText = text;
  
  if (show_syllables) {
    formattedText = syllabify(formattedText);
  }
  
  if (show_pos_colors) {
    const posWords = generatePOSColors(formattedText);
    formattedText = posWords.map(w => 
      `<span style="color: ${w.color}">${w.word}</span>`
    ).join(' ');
  }
  
  if (bionic_reading) {
    formattedText = formattedText.replace(/\b(\w+)\b/g, (word) => {
      if (word.length <= 3) return `<b>${word}</b>`;
      const midPoint = Math.ceil(word.length / 2);
      return `<b>${word.slice(0, midPoint)}</b>${word.slice(midPoint)}`;
    });
  }
  
  return `<div class="dyslexia-text" style="
    font-family: 'OpenDyslexic', Arial, sans-serif;
    font-size: ${font_size}px;
    line-height: ${line_height};
    letter-spacing: ${letter_spacing}em;
    max-width: 600px;
  ">${formattedText}</div>`;
}

/**
 * Translate text to target language
 * @param {string} text - Input text
 * @param {string} targetLang - Target language code
 * @returns {string} Translated text
 */
function translateText(text, targetLang) {
  // Check if we have a direct translation
  if (translations[text] && translations[text][targetLang]) {
    return translations[text][targetLang];
  }
  
  // Fallback: return a mock translation
  return `[${targetLang.toUpperCase()}] ${text}`;
}

/**
 * Generate audio URL (mock)
 * @param {string} text - Input text
 * @param {string} language - Language code
 * @param {object} options - Audio options
 * @returns {object} Audio metadata
 */
function generateAudioURL(text, language = 'en', options = {}) {
  const {
    gender = 'neutral',
    speed = 1.0,
    format = 'mp3'
  } = options;
  
  const audioId = uuidv4();
  const duration = Math.ceil(text.split(' ').length * 0.5); // Rough estimate
  
  return {
    url: `${CDN_BASE_URL}/audio/${language}/${audioId}.${format}`,
    duration_sec: duration,
    format,
    bitrate: format === 'mp3' ? '128kbps' : '256kbps',
    language,
    gender,
    speed
  };
}

/**
 * Generate request ID
 * @returns {string} Unique request ID
 */
function generateRequestId() {
  return `req_${Date.now()}_${uuidv4().slice(0, 8)}`;
}

/**
 * Sanitize input text
 * @param {string} text - Input text
 * @returns {string} Sanitized text
 */
function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  
  // Remove HTML tags
  let sanitized = text.replace(/<[^>]*>/g, '');
  
  // Remove script content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Format success response
 * @param {object} data - Response data
 * @returns {object} Formatted response
 */
function formatSuccessResponse(data) {
  return {
    success: true,
    data,
    error: null
  };
}

/**
 * Format error response
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {string} details - Error details
 * @returns {object} Formatted error response
 */
function formatErrorResponse(code, message, details = '') {
  return {
    success: false,
    error: {
      code,
      message,
      details
    }
  };
}

/**
 * Calculate cache key from request data
 * @param {object} data - Request data
 * @returns {string} Cache key
 */
function generateCacheKey(data) {
  return JSON.stringify(data);
}

module.exports = {
  tokenize,
  getPOSTag,
  generatePOSColors,
  syllabify,
  analyzeReadability,
  generateDyslexiaHTML,
  translateText,
  generateAudioURL,
  generateRequestId,
  sanitizeText,
  formatSuccessResponse,
  formatErrorResponse,
  generateCacheKey
};
