const { CDN_BASE_URL } = require('../config/constants');

// Mock sign language video database
// In production, this would connect to a real database or API
const signLanguageDB = {
  ISL: {
    // Greetings
    'hello': { url: `${CDN_BASE_URL}/isl/hello.mp4`, duration: 2.5, category: 'greetings', difficulty: 'easy' },
    'hi': { url: `${CDN_BASE_URL}/isl/hi.mp4`, duration: 1.8, category: 'greetings', difficulty: 'easy' },
    'goodbye': { url: `${CDN_BASE_URL}/isl/goodbye.mp4`, duration: 2.2, category: 'greetings', difficulty: 'easy' },
    'thanks': { url: `${CDN_BASE_URL}/isl/thanks.mp4`, duration: 1.5, category: 'greetings', difficulty: 'easy' },
    'welcome': { url: `${CDN_BASE_URL}/isl/welcome.mp4`, duration: 2.0, category: 'greetings', difficulty: 'easy' },
    
    // Questions
    'how': { url: `${CDN_BASE_URL}/isl/how.mp4`, duration: 1.8, category: 'social', difficulty: 'easy' },
    'what': { url: `${CDN_BASE_URL}/isl/what.mp4`, duration: 1.6, category: 'social', difficulty: 'easy' },
    'when': { url: `${CDN_BASE_URL}/isl/when.mp4`, duration: 1.7, category: 'social', difficulty: 'easy' },
    'where': { url: `${CDN_BASE_URL}/isl/where.mp4`, duration: 1.9, category: 'social', difficulty: 'easy' },
    'why': { url: `${CDN_BASE_URL}/isl/why.mp4`, duration: 1.8, category: 'social', difficulty: 'easy' },
    'who': { url: `${CDN_BASE_URL}/isl/who.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    
    // Pronouns
    'i': { url: `${CDN_BASE_URL}/isl/i.mp4`, duration: 1.2, category: 'social', difficulty: 'easy' },
    'you': { url: `${CDN_BASE_URL}/isl/you.mp4`, duration: 1.3, category: 'social', difficulty: 'easy' },
    'we': { url: `${CDN_BASE_URL}/isl/we.mp4`, duration: 1.4, category: 'social', difficulty: 'easy' },
    'they': { url: `${CDN_BASE_URL}/isl/they.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    
    // Common verbs
    'am': { url: `${CDN_BASE_URL}/isl/am.mp4`, duration: 1.3, category: 'social', difficulty: 'easy' },
    'are': { url: `${CDN_BASE_URL}/isl/are.mp4`, duration: 1.3, category: 'social', difficulty: 'easy' },
    'is': { url: `${CDN_BASE_URL}/isl/is.mp4`, duration: 1.2, category: 'social', difficulty: 'easy' },
    'have': { url: `${CDN_BASE_URL}/isl/have.mp4`, duration: 1.4, category: 'social', difficulty: 'easy' },
    'need': { url: `${CDN_BASE_URL}/isl/need.mp4`, duration: 1.6, category: 'social', difficulty: 'easy' },
    'want': { url: `${CDN_BASE_URL}/isl/want.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    'go': { url: `${CDN_BASE_URL}/isl/go.mp4`, duration: 1.4, category: 'social', difficulty: 'easy' },
    'come': { url: `${CDN_BASE_URL}/isl/come.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    'help': { url: `${CDN_BASE_URL}/isl/help.mp4`, duration: 1.7, category: 'emergency', difficulty: 'easy' },
    'know': { url: `${CDN_BASE_URL}/isl/know.mp4`, duration: 1.6, category: 'social', difficulty: 'easy' },
    'understand': { url: `${CDN_BASE_URL}/isl/understand.mp4`, duration: 2.3, category: 'social', difficulty: 'medium' },
    
    // Emergency
    'emergency': { url: `${CDN_BASE_URL}/isl/emergency.mp4`, duration: 2.5, category: 'emergency', difficulty: 'medium' },
    'doctor': { url: `${CDN_BASE_URL}/isl/doctor.mp4`, duration: 2.0, category: 'medical', difficulty: 'easy' },
    'hospital': { url: `${CDN_BASE_URL}/isl/hospital.mp4`, duration: 2.4, category: 'medical', difficulty: 'medium' },
    'medicine': { url: `${CDN_BASE_URL}/isl/medicine.mp4`, duration: 2.3, category: 'medical', difficulty: 'medium' },
    'pain': { url: `${CDN_BASE_URL}/isl/pain.mp4`, duration: 1.8, category: 'medical', difficulty: 'easy' },
    'sick': { url: `${CDN_BASE_URL}/isl/sick.mp4`, duration: 1.9, category: 'medical', difficulty: 'easy' },
    
    // Time
    'today': { url: `${CDN_BASE_URL}/isl/today.mp4`, duration: 1.8, category: 'social', difficulty: 'easy' },
    'tomorrow': { url: `${CDN_BASE_URL}/isl/tomorrow.mp4`, duration: 2.2, category: 'social', difficulty: 'easy' },
    'yesterday': { url: `${CDN_BASE_URL}/isl/yesterday.mp4`, duration: 2.3, category: 'social', difficulty: 'medium' },
    'now': { url: `${CDN_BASE_URL}/isl/now.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    'later': { url: `${CDN_BASE_URL}/isl/later.mp4`, duration: 1.7, category: 'social', difficulty: 'easy' },
    
    // Common adjectives
    'good': { url: `${CDN_BASE_URL}/isl/good.mp4`, duration: 1.6, category: 'social', difficulty: 'easy' },
    'bad': { url: `${CDN_BASE_URL}/isl/bad.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    'happy': { url: `${CDN_BASE_URL}/isl/happy.mp4`, duration: 1.8, category: 'social', difficulty: 'easy' },
    'sad': { url: `${CDN_BASE_URL}/isl/sad.mp4`, duration: 1.7, category: 'social', difficulty: 'easy' },
    'big': { url: `${CDN_BASE_URL}/isl/big.mp4`, duration: 1.5, category: 'social', difficulty: 'easy' },
    'small': { url: `${CDN_BASE_URL}/isl/small.mp4`, duration: 1.6, category: 'social', difficulty: 'easy' },
    
    // Doing
    'doing': { url: `${CDN_BASE_URL}/isl/doing.mp4`, duration: 1.9, category: 'social', difficulty: 'easy' },
    
    // Numbers
    'one': { url: `${CDN_BASE_URL}/isl/one.mp4`, duration: 1.3, category: 'education', difficulty: 'easy' },
    'two': { url: `${CDN_BASE_URL}/isl/two.mp4`, duration: 1.3, category: 'education', difficulty: 'easy' },
    'three': { url: `${CDN_BASE_URL}/isl/three.mp4`, duration: 1.4, category: 'education', difficulty: 'easy' },
    
    // Default fallback for unknown words
    'default': { url: `${CDN_BASE_URL}/isl/fingerspell.mp4`, duration: 3.0, category: 'social', difficulty: 'medium' }
  },
  
  ASL: {
    'hello': { url: `${CDN_BASE_URL}/asl/hello.mp4`, duration: 2.3, category: 'greetings', difficulty: 'easy' },
    'how': { url: `${CDN_BASE_URL}/asl/how.mp4`, duration: 1.7, category: 'social', difficulty: 'easy' },
    'are': { url: `${CDN_BASE_URL}/asl/are.mp4`, duration: 1.2, category: 'social', difficulty: 'easy' },
    'you': { url: `${CDN_BASE_URL}/asl/you.mp4`, duration: 1.2, category: 'social', difficulty: 'easy' },
    'default': { url: `${CDN_BASE_URL}/asl/fingerspell.mp4`, duration: 3.0, category: 'social', difficulty: 'medium' }
  },
  
  BSL: {
    'hello': { url: `${CDN_BASE_URL}/bsl/hello.mp4`, duration: 2.4, category: 'greetings', difficulty: 'easy' },
    'how': { url: `${CDN_BASE_URL}/bsl/how.mp4`, duration: 1.8, category: 'social', difficulty: 'easy' },
    'are': { url: `${CDN_BASE_URL}/bsl/are.mp4`, duration: 1.3, category: 'social', difficulty: 'easy' },
    'you': { url: `${CDN_BASE_URL}/bsl/you.mp4`, duration: 1.3, category: 'social', difficulty: 'easy' },
    'default': { url: `${CDN_BASE_URL}/bsl/fingerspell.mp4`, duration: 3.0, category: 'social', difficulty: 'medium' }
  }
};

/**
 * Get sign language video for a word
 * @param {string} word - The word to look up
 * @param {string} variant - Sign language variant (ISL, ASL, BSL)
 * @returns {object} Video data or default
 */
function getSignVideo(word, variant = 'ISL') {
  const normalizedWord = word.toLowerCase().trim();
  const db = signLanguageDB[variant] || signLanguageDB.ISL;
  return db[normalizedWord] || db.default;
}

/**
 * Get all vocabulary for a variant
 * @param {string} variant - Sign language variant
 * @param {object} filters - Optional filters (category, search)
 * @returns {array} Array of vocabulary items
 */
function getVocabulary(variant = 'ISL', filters = {}) {
  const db = signLanguageDB[variant] || signLanguageDB.ISL;
  let vocabulary = Object.keys(db)
    .filter(word => word !== 'default')
    .map((word, index) => ({
      id: index + 1,
      word,
      video_url: db[word].url,
      duration_sec: db[word].duration,
      category: db[word].category,
      difficulty: db[word].difficulty,
      alternate_variants: {
        ASL: signLanguageDB.ASL[word]?.url || null,
        BSL: signLanguageDB.BSL[word]?.url || null
      },
      usage_context: `Common usage for '${word}'`
    }));
  
  // Apply filters
  if (filters.category) {
    vocabulary = vocabulary.filter(v => v.category === filters.category);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    vocabulary = vocabulary.filter(v => v.word.includes(searchLower));
  }
  
  return vocabulary;
}

/**
 * Get vocabulary count
 * @param {string} variant - Sign language variant
 * @returns {number} Total count
 */
function getVocabularyCount(variant = 'ISL') {
  const db = signLanguageDB[variant] || signLanguageDB.ISL;
  return Object.keys(db).filter(word => word !== 'default').length;
}

module.exports = {
  signLanguageDB,
  getSignVideo,
  getVocabulary,
  getVocabularyCount
};
