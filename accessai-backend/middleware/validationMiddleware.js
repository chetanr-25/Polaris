const {
  USER_TYPES,
  SUPPORTED_LANGUAGES,
  SIGN_LANGUAGE_VARIANTS,
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_SPEECH_SPEED,
  MAX_SPEECH_SPEED,
  AUDIO_FORMATS,
  ERROR_CODES
} = require('../config/constants');
const { sanitizeText } = require('../utils/helpers');

/**
 * Validate process-input request
 */
function validateProcessInput(req, res, next) {
  const { text, user_type, language } = req.body;
  
  // Validate text
  if (!text) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Text field is required',
        details: 'Provide \'text\' field in request body'
      }
    });
  }
  
  // Sanitize text
  const sanitizedText = sanitizeText(text);
  
  if (sanitizedText.length < MIN_TEXT_LENGTH) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Text is too short',
        details: `Text must be at least ${MIN_TEXT_LENGTH} character(s)`
      }
    });
  }
  
  if (sanitizedText.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Text is too long',
        details: `Text must not exceed ${MAX_TEXT_LENGTH} characters`
      }
    });
  }
  
  // Validate user type
  if (user_type && !USER_TYPES.includes(user_type)) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Invalid user type',
        details: `User type must be one of: ${USER_TYPES.join(', ')}`
      }
    });
  }
  
  // Validate language
  if (language) {
    const languageExists = SUPPORTED_LANGUAGES.some(lang => lang.code === language);
    if (!languageExists) {
      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.UNSUPPORTED_LANGUAGE,
          message: 'Unsupported language',
          details: `Language '${language}' is not supported`
        }
      });
    }
  }
  
  // Validate sign language variant if provided
  const preferences = req.body.accessibility_preferences || {};
  if (preferences.sign_language_variant) {
    if (!SIGN_LANGUAGE_VARIANTS.includes(preferences.sign_language_variant)) {
      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_REQUEST,
          message: 'Invalid sign language variant',
          details: `Variant must be one of: ${SIGN_LANGUAGE_VARIANTS.join(', ')}`
        }
      });
    }
  }
  
  // Store sanitized text
  req.body.text = sanitizedText;
  
  next();
}

/**
 * Validate text-to-speech request
 */
function validateTextToSpeech(req, res, next) {
  const { text, language, speed, format } = req.body;
  
  // Validate text
  if (!text || typeof text !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Text field is required',
        details: 'Provide \'text\' field as a string in request body'
      }
    });
  }
  
  // Sanitize text
  req.body.text = sanitizeText(text);
  
  // Validate language
  if (language) {
    const languageExists = SUPPORTED_LANGUAGES.some(lang => lang.code === language);
    if (!languageExists) {
      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.UNSUPPORTED_LANGUAGE,
          message: 'Unsupported language',
          details: `Language '${language}' is not supported`
        }
      });
    }
  }
  
  // Validate speed
  if (speed !== undefined) {
    const speedNum = parseFloat(speed);
    if (isNaN(speedNum) || speedNum < MIN_SPEECH_SPEED || speedNum > MAX_SPEECH_SPEED) {
      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid speed value',
          details: `Speed must be between ${MIN_SPEECH_SPEED} and ${MAX_SPEECH_SPEED}`
        }
      });
    }
  }
  
  // Validate format
  if (format && !AUDIO_FORMATS.includes(format)) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Invalid audio format',
        details: `Format must be one of: ${AUDIO_FORMATS.join(', ')}`
      }
    });
  }
  
  next();
}

/**
 * Validate translate request
 */
function validateTranslate(req, res, next) {
  const { text, source_language, target_languages } = req.body;
  
  // Validate text
  if (!text || typeof text !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Text field is required',
        details: 'Provide \'text\' field as a string in request body'
      }
    });
  }
  
  // Sanitize text
  req.body.text = sanitizeText(text);
  
  // Validate source language
  if (source_language) {
    const languageExists = SUPPORTED_LANGUAGES.some(lang => lang.code === source_language);
    if (!languageExists) {
      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.UNSUPPORTED_LANGUAGE,
          message: 'Unsupported source language',
          details: `Language '${source_language}' is not supported`
        }
      });
    }
  }
  
  // Validate target languages
  if (target_languages && Array.isArray(target_languages)) {
    for (const lang of target_languages) {
      const languageExists = SUPPORTED_LANGUAGES.some(l => l.code === lang);
      if (!languageExists) {
        return res.status(400).json({
          success: false,
          error: {
            code: ERROR_CODES.UNSUPPORTED_LANGUAGE,
            message: 'Unsupported target language',
            details: `Language '${lang}' is not supported`
          }
        });
      }
    }
  }
  
  next();
}

/**
 * Validate dyslexia format request
 */
function validateDyslexiaFormat(req, res, next) {
  const { text } = req.body;
  
  // Validate text
  if (!text || typeof text !== 'string') {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Text field is required',
        details: 'Provide \'text\' field as a string in request body'
      }
    });
  }
  
  // Sanitize text
  req.body.text = sanitizeText(text);
  
  next();
}

module.exports = {
  validateProcessInput,
  validateTextToSpeech,
  validateTranslate,
  validateDyslexiaFormat
};
