const { getSignVideo } = require('../utils/signLanguageDB');
const {
  tokenize,
  generatePOSColors,
  syllabify,
  analyzeReadability,
  generateDyslexiaHTML,
  translateText,
  generateAudioURL,
  generateRequestId,
  formatSuccessResponse
} = require('../utils/helpers');
const { SUPPORTED_LANGUAGES, CDN_BASE_URL, WCAG_LEVEL } = require('../config/constants');

/**
 * Main processing endpoint
 * Receives user input and returns multi-modal outputs
 */
async function processInput(req, res) {
  const startTime = Date.now();
  
  const {
    text,
    user_type = 'deaf',
    language = 'en',
    accessibility_preferences = {}
  } = req.body;
  
  const {
    sign_language_variant = 'ISL',
    font_size = 16,
    high_contrast = false,
    bionic_reading = false,
    reading_speed = 1.0
  } = accessibility_preferences;
  
  try {
    // Tokenize text into words
    const words = tokenize(text);
    
    // Generate sign language videos
    const signLanguageVideos = words.map(word => {
      const videoData = getSignVideo(word, sign_language_variant);
      return {
        word,
        url: videoData.url,
        duration_sec: videoData.duration,
        difficulty: videoData.difficulty
      };
    });
    
    // Calculate total duration for sign language sequence
    const totalDuration = signLanguageVideos.reduce((sum, v) => sum + v.duration_sec, 0);
    const sequenceId = generateRequestId().split('_')[2];
    
    // Generate formatted text with POS colors
    const posColoredWords = generatePOSColors(text);
    const syllabifiedText = syllabify(text);
    const readabilityAnalysis = analyzeReadability(text);
    
    // Generate dyslexia-friendly HTML
    const dyslexiaHTML = generateDyslexiaHTML(text, {
      font_size,
      show_syllables: true,
      show_pos_colors: true,
      bionic_reading
    });
    
    // Generate audio metadata
    const defaultAudio = generateAudioURL(text, language, {
      gender: 'neutral',
      speed: reading_speed,
      format: 'mp3'
    });
    
    // Generate audio variants
    const audioVariants = [
      generateAudioURL(text, language, { gender: 'female', speed: reading_speed, format: 'mp3' }),
      generateAudioURL(text, language, { gender: 'male', speed: reading_speed, format: 'mp3' })
    ];
    
    // Generate translations for multiple languages
    const translations = {};
    const targetLanguages = ['hi', 'es', 'ta', 'te', 'kn', 'zh', 'ja', 'fr'];
    
    targetLanguages.forEach(targetLang => {
      if (targetLang !== language) {
        const translatedText = translateText(text, targetLang);
        const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
        
        translations[targetLang] = {
          text: translatedText,
          audio_url: generateAudioURL(translatedText, targetLang, { format: 'mp3' }).url,
          language_code: targetLang,
          language_name: langInfo ? langInfo.native_name : targetLang
        };
      }
    });
    
    // Calculate processing time
    const processingTime = Date.now() - startTime;
    
    // Build response
    const responseData = {
      input_text: text,
      processed_time_ms: processingTime,
      
      sign_language: {
        variant: sign_language_variant,
        videos: signLanguageVideos,
        full_sequence_url: `${CDN_BASE_URL}/sequences/${sign_language_variant.toLowerCase()}/${sequenceId}.mp4`,
        full_sequence_duration_sec: parseFloat(totalDuration.toFixed(1)),
        captions: words.join(' → ')
      },
      
      formatted_text: {
        original: text,
        dyslexia_friendly_html: dyslexiaHTML,
        syllabified: syllabifiedText,
        color_coded_pos: posColoredWords,
        reading_difficulty: readabilityAnalysis.reading_difficulty,
        reading_level: readabilityAnalysis.reading_level,
        estimated_reading_time_sec: readabilityAnalysis.estimated_reading_time_sec
      },
      
      audio: {
        default: {
          language,
          gender: defaultAudio.gender,
          speed: defaultAudio.speed,
          url: defaultAudio.url,
          duration_sec: defaultAudio.duration_sec,
          format: defaultAudio.format,
          bitrate: defaultAudio.bitrate
        },
        variants: audioVariants.map(a => ({
          language,
          gender: a.gender,
          speed: a.speed,
          url: a.url
        }))
      },
      
      translations,
      
      accessibility_features: {
        wcag_compliance: WCAG_LEVEL,
        keyboard_navigable: true,
        screen_reader_friendly: true,
        high_contrast_ready: high_contrast,
        focus_visible: true
      },
      
      metadata: {
        request_id: generateRequestId(),
        timestamp: new Date().toISOString(),
        version: '1.0',
        cache_hit: false,
        cache_ttl_seconds: 3600
      }
    };
    
    res.json(formatSuccessResponse(responseData));
    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  processInput
};
