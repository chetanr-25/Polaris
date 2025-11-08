// Sample queries for demonstrating the AccessAI platform

const sampleQueries = {
  deaf_queries: [
    {
      id: 1,
      text: 'Hello, how are you doing today?',
      category: 'social',
      difficulty: 'easy',
      expected_output: 'Simple greeting with clear sign language videos'
    },
    {
      id: 2,
      text: 'I need emergency medical help',
      category: 'emergency',
      difficulty: 'medium',
      expected_output: 'Urgent medical request with clear communication'
    },
    {
      id: 3,
      text: 'Where is the nearest hospital?',
      category: 'medical',
      difficulty: 'medium',
      expected_output: 'Location query with directional signs'
    },
    {
      id: 4,
      text: 'Can you help me understand this?',
      category: 'social',
      difficulty: 'medium',
      expected_output: 'Request for assistance with comprehension support'
    },
    {
      id: 5,
      text: 'Thank you for your help',
      category: 'social',
      difficulty: 'easy',
      expected_output: 'Gratitude expression with appropriate signs'
    },
    {
      id: 6,
      text: 'I am looking for a job opportunity',
      category: 'professional',
      difficulty: 'hard',
      expected_output: 'Professional inquiry with career-related signs'
    },
    {
      id: 7,
      text: 'What time does the store open?',
      category: 'daily',
      difficulty: 'medium',
      expected_output: 'Time-related query with appropriate signs'
    },
    {
      id: 8,
      text: 'Good morning, have a nice day',
      category: 'social',
      difficulty: 'easy',
      expected_output: 'Morning greeting with positive sentiment'
    },
    {
      id: 9,
      text: 'I need to make a doctor appointment',
      category: 'medical',
      difficulty: 'medium',
      expected_output: 'Medical scheduling request'
    },
    {
      id: 10,
      text: 'Can I get directions to the library?',
      category: 'daily',
      difficulty: 'medium',
      expected_output: 'Navigation request with directional support'
    }
  ],
  
  speech_impaired_queries: [
    {
      id: 11,
      text: 'I need to speak with customer service',
      category: 'professional',
      difficulty: 'medium',
      expected_output: 'Service request with text-to-speech output'
    },
    {
      id: 12,
      text: 'Can you repeat that please?',
      category: 'social',
      difficulty: 'easy',
      expected_output: 'Clarification request with audio support'
    },
    {
      id: 13,
      text: 'I would like to order food',
      category: 'daily',
      difficulty: 'easy',
      expected_output: 'Food ordering with clear audio output'
    },
    {
      id: 14,
      text: 'Please call emergency services',
      category: 'emergency',
      difficulty: 'hard',
      expected_output: 'Emergency communication with immediate audio'
    },
    {
      id: 15,
      text: 'What is the weather forecast today?',
      category: 'daily',
      difficulty: 'easy',
      expected_output: 'Information query with audio response'
    },
    {
      id: 16,
      text: 'I have a question about my bill',
      category: 'professional',
      difficulty: 'medium',
      expected_output: 'Financial inquiry with professional tone'
    },
    {
      id: 17,
      text: 'Can you help me find this product?',
      category: 'daily',
      difficulty: 'easy',
      expected_output: 'Shopping assistance with audio support'
    },
    {
      id: 18,
      text: 'I need technical support for my device',
      category: 'professional',
      difficulty: 'hard',
      expected_output: 'Technical support request'
    },
    {
      id: 19,
      text: 'Where can I find the restroom?',
      category: 'daily',
      difficulty: 'easy',
      expected_output: 'Simple location query'
    },
    {
      id: 20,
      text: 'I would like to schedule a meeting',
      category: 'professional',
      difficulty: 'medium',
      expected_output: 'Professional scheduling request'
    }
  ],
  
  dyslexia_queries: [
    {
      id: 21,
      text: 'Photosynthesis is the process by which plants convert light energy',
      category: 'education',
      difficulty: 'hard',
      expected_output: 'Scientific text with syllabification and color coding'
    },
    {
      id: 22,
      text: 'The quick brown fox jumps over the lazy dog',
      category: 'education',
      difficulty: 'easy',
      expected_output: 'Simple sentence with dyslexia-friendly formatting'
    },
    {
      id: 23,
      text: 'Climate change affects ecosystems worldwide',
      category: 'education',
      difficulty: 'medium',
      expected_output: 'Educational content with enhanced readability'
    },
    {
      id: 24,
      text: 'Mathematics requires logical thinking and problem solving',
      category: 'education',
      difficulty: 'hard',
      expected_output: 'Academic text with comprehension support'
    },
    {
      id: 25,
      text: 'Reading books improves vocabulary and imagination',
      category: 'education',
      difficulty: 'medium',
      expected_output: 'Reading encouragement with accessible formatting'
    },
    {
      id: 26,
      text: 'Technology connects people across the globe',
      category: 'education',
      difficulty: 'medium',
      expected_output: 'Modern topic with clear presentation'
    },
    {
      id: 27,
      text: 'Healthy eating habits contribute to overall wellness',
      category: 'education',
      difficulty: 'medium',
      expected_output: 'Health information with readable format'
    },
    {
      id: 28,
      text: 'Communication skills are essential for success',
      category: 'professional',
      difficulty: 'medium',
      expected_output: 'Professional development text'
    },
    {
      id: 29,
      text: 'Democracy empowers citizens to participate in governance',
      category: 'education',
      difficulty: 'hard',
      expected_output: 'Civic education with enhanced readability'
    },
    {
      id: 30,
      text: 'Exercise improves physical and mental health',
      category: 'education',
      difficulty: 'easy',
      expected_output: 'Health advice with clear formatting'
    }
  ]
};

/**
 * Get all sample queries
 * @returns {object} All sample queries by user type
 */
function getAllSampleQueries() {
  return sampleQueries;
}

/**
 * Get sample queries by user type
 * @param {string} userType - User type (deaf, speech, dyslexia)
 * @returns {array} Sample queries for that user type
 */
function getSampleQueriesByType(userType) {
  const key = `${userType}_queries`;
  return sampleQueries[key] || [];
}

/**
 * Get random sample query
 * @param {string} userType - User type
 * @returns {object} Random sample query
 */
function getRandomQuery(userType) {
  const queries = getSampleQueriesByType(userType);
  if (queries.length === 0) return null;
  return queries[Math.floor(Math.random() * queries.length)];
}

module.exports = {
  sampleQueries,
  getAllSampleQueries,
  getSampleQueriesByType,
  getRandomQuery
};
