/**
 * Utility Functions
 * Helper functions for the memory card game
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * This algorithm ensures each permutation has equal probability
 * Creates a new array to avoid mutating the original
 * 
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array (original array is not modified)
 * 
 * @example
 * const cards = [1, 2, 3, 4];
 * const shuffled = shuffleArray(cards);
 * // cards is still [1, 2, 3, 4]
 * // shuffled is a random permutation like [3, 1, 4, 2]
 */
export function shuffleArray(array) {
  // Validate input
  if (!Array.isArray(array)) {
    console.error('shuffleArray: Input must be an array');
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating the original array
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  // Start from the last element and swap with a random element before it
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at positions i and j
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






