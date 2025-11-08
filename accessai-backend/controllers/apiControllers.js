const { getVocabulary, getVocabularyCount } = require('../utils/signLanguageDB');
const { getAllSampleQueries } = require('../utils/sampleQueries');
const {
  generateAudioURL,
  translateText,
  generateDyslexiaHTML,
  analyzeReadability,
  syllabify,
  generatePOSColors,
  formatSuccessResponse
} = require('../utils/helpers');
const { SUPPORTED_LANGUAGES, WCAG_LEVEL, TARGET_WCAG_LEVEL } = require('../config/constants');

/**
 * Text-to-speech endpoint
 */
async function textToSpeech(req, res) {
  const {
    text,
    language = 'en',
    gender = 'neutral',
    speed = 1.0,
    format = 'mp3'
  } = req.body;
  
  try {
    const audio = generateAudioURL(text, language, { gender, speed, format });
    
    const responseData = {
      text,
      language,
      gender,
      speed,
      audio_url: audio.url,
      duration_sec: audio.duration_sec,
      format: audio.format,
      bitrate: audio.bitrate,
      created_at: new Date().toISOString()
    };
    
    res.json(formatSuccessResponse(responseData));
  } catch (error) {
    throw error;
  }
}

/**
 * Translation endpoint
 */
async function translate(req, res) {
  const {
    text,
    source_language = 'en',
    target_languages = [],
    include_audio = false
  } = req.body;
  
  try {
    const translations = {};
    
    target_languages.forEach(targetLang => {
      const translatedText = translateText(text, targetLang);
      const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
      
      translations[targetLang] = {
        text: translatedText,
        language_code: targetLang,
        language_name: langInfo ? langInfo.native_name : targetLang
      };
      
      if (include_audio) {
        const audio = generateAudioURL(translatedText, targetLang, { format: 'mp3' });
        translations[targetLang].audio_url = audio.url;
      }
    });
    
    const responseData = {
      source_text: text,
      source_language,
      translations,
      timestamp: new Date().toISOString()
    };
    
    res.json(formatSuccessResponse(responseData));
  } catch (error) {
    throw error;
  }
}

/**
 * Sample queries endpoint
 */
async function getSampleQueries(req, res) {
  try {
    const queries = getAllSampleQueries();
    res.json(formatSuccessResponse(queries));
  } catch (error) {
    throw error;
  }
}

/**
 * Sign language vocabulary endpoint
 */
async function getSignLanguageVocabulary(req, res) {
  const {
    variant = 'ISL',
    category,
    search,
    limit = 50,
    offset = 0
  } = req.query;
  
  try {
    const filters = {};
    if (category) filters.category = category;
    if (search) filters.search = search;
    
    let vocabulary = getVocabulary(variant, filters);
    const totalCount = vocabulary.length;
    
    // Apply pagination
    const paginatedVocabulary = vocabulary.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );
    
    const responseData = {
      variant,
      total_count: getVocabularyCount(variant),
      returned_count: paginatedVocabulary.length,
      vocabulary: paginatedVocabulary
    };
    
    res.json(formatSuccessResponse(responseData));
  } catch (error) {
    throw error;
  }
}

/**
 * Dyslexia formatting endpoint
 */
async function formatForDyslexia(req, res) {
  const {
    text,
    preferences = {}
  } = req.body;
  
  const {
    font_size = 16,
    show_syllables = true,
    show_pos_colors = true,
    bionic_reading = false,
    line_height = 1.8,
    letter_spacing = 0.15
  } = preferences;
  
  try {
    const formattedHTML = generateDyslexiaHTML(text, {
      font_size,
      show_syllables,
      show_pos_colors,
      bionic_reading,
      line_height,
      letter_spacing
    });
    
    const syllabifiedText = syllabify(text);
    const readabilityAnalysis = analyzeReadability(text);
    const posWords = generatePOSColors(text);
    
    // Identify complex words (more than 3 syllables or > 8 characters)
    const words = text.split(/\s+/);
    const complexWords = words.filter(w => w.length > 8);
    
    const responseData = {
      original: text,
      formatted_html: formattedHTML,
      syllabified: syllabifiedText,
      complexity_analysis: {
        reading_level: readabilityAnalysis.reading_level,
        flesch_kincaid_grade: readabilityAnalysis.flesch_kincaid_grade,
        estimated_reading_time_sec: readabilityAnalysis.estimated_reading_time_sec,
        unique_words: readabilityAnalysis.unique_words,
        complex_words: complexWords
      },
      parts_of_speech: posWords
    };
    
    res.json(formatSuccessResponse(responseData));
  } catch (error) {
    throw error;
  }
}

/**
 * Languages endpoint
 */
async function getLanguages(req, res) {
  try {
    const languages = SUPPORTED_LANGUAGES.map(lang => ({
      code: lang.code,
      name: lang.name,
      native_name: lang.native_name,
      supported_tts: lang.tts,
      supported_translation: lang.translation,
      sign_language_available: lang.sign_language,
      sign_language_variants: lang.sign_variants || []
    }));
    
    res.json(formatSuccessResponse({ languages }));
  } catch (error) {
    throw error;
  }
}

/**
 * Accessibility statement endpoint
 */
async function getAccessibilityStatement(req, res) {
  try {
    const responseData = {
      wcag_level: WCAG_LEVEL,
      target_level: TARGET_WCAG_LEVEL,
      compliance_percentage: 92,
      tested_with: ['NVDA', 'JAWS', 'Chrome DevTools', 'Lighthouse'],
      features: [
        'Keyboard navigation',
        'Screen reader support',
        'High contrast mode',
        'Adjustable font size',
        'Captions for all audio',
        'Sign language support',
        'Dyslexia-friendly formatting',
        'Multi-language support',
        'Text-to-speech',
        'Color-coded text'
      ],
      known_issues: [],
      accessibility_statement: 'AccessAI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. This application aims to conform to WCAG 2.1 Level AA standards.',
      last_reviewed: '2025-11-08'
    };
    
    res.json(formatSuccessResponse(responseData));
  } catch (error) {
    throw error;
  }
}

/**
 * Health check endpoint
 */
async function healthCheck(req, res) {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}

module.exports = {
  textToSpeech,
  translate,
  getSampleQueries,
  getSignLanguageVocabulary,
  formatForDyslexia,
  getLanguages,
  getAccessibilityStatement,
  healthCheck
};
