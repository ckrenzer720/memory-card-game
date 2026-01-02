/**
 * Utility Functions
 * Helper functions for the memory card game
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Create a delay (useful for animations)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after delay
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



