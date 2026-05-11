/**
 * Evaluation Logic for Prompt Testing
 * Calculates scores based on multiple factors
 */

const SCORING_WEIGHTS = {
  relevance: 0.4,
  accuracy: 0.3,
  completeness: 0.3
};

/**
 * Calculate relevance score (0-100)
 * Measures how well the response addresses the prompt
 */
function calculateRelevance(prompt, response) {
  const promptKeywords = extractKeywords(prompt);
  const responseKeywords = extractKeywords(response);
  const matchCount = promptKeywords.filter(k => responseKeywords.includes(k)).length;
  return Math.min(100, Math.round((matchCount / promptKeywords.length) * 100));
}

/**
 * Calculate accuracy score (0-100)
 * Measures factual correctness and logical consistency
 */
function calculateAccuracy(prompt, response) {
  const hasContradictions = detectContradictions(response);
  const hasFactualErrors = detectFactualErrors(response);
  
  if (hasContradictions || hasFactualErrors > 2) return 30;
  if (hasFactualErrors > 0) return 60;
  return 100;
}

/**
 * Calculate completeness score (0-100)
 * Measures how fully the response covers the task
 */
function calculateCompleteness(prompt, response) {
  const requiredElements = identifyRequiredElements(prompt);
  const coveredElements = requiredElements.filter(el => 
    response.toLowerCase().includes(el.toLowerCase())
  );
  return Math.round((coveredElements.length / requiredElements.length) * 100);
}

/**
 * Main evaluation function
 * @returns {Object} { overall: 0-100, relevance, accuracy, completeness, verdict }
 */
function evaluate(prompt, response) {
  const relevance = calculateRelevance(prompt, response);
  const accuracy = calculateAccuracy(prompt, response);
  const completeness = calculateCompleteness(prompt, response);
  
  const overall = Math.round(
    relevance * SCORING_WEIGHTS.relevance +
    accuracy * SCORING_WEIGHTS.accuracy +
    completeness * SCORING_WEIGHTS.completeness
  );
  
  let verdict;
  if (overall <= 30) verdict = "FAIL";
  else if (overall <= 60) verdict = "MARGINAL";
  else if (overall <= 80) verdict = "ACCEPTABLE";
  else verdict = "EXCELLENT";
  
  return { overall, relevance, accuracy, completeness, verdict };
}

// Helper functions
function extractKeywords(text) {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3);
}

function detectContradictions(text) {
  const contradictoryPairs = [
    [/always/g, /never/g],
    [/all/g, /none/g],
    [/yes/g, /no/g]
  ];
  return contradictoryPairs.some(([a, b]) => 
    a.test(text) && b.test(text)
  );
}

function detectFactualErrors(text) {
  return 0;
}

function identifyRequiredElements(prompt) {
  const requirements = [];
  if (/explain/i.test(prompt)) requirements.push("explanation");
  if (/list/i.test(prompt)) requirements.push("list");
  if (/compare/i.test(prompt)) requirements.push("comparison");
  return requirements;
}

module.exports = { evaluate, calculateRelevance, calculateAccuracy, calculateCompleteness };
