/**
 * Utility Functions
 * Helper functions for the memory card game
 */

/**
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array (original array is not modified)
 */
export function shuffleArray(array) {
  // Validate input
  if (!Array.isArray(array)) {
    if (process.env.NODE_ENV !== "production") {
      console.error("shuffleArray: Input must be an array");
    }
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  // Create a copy to avoid mutating the original array
  const shuffled = [...array];

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

/**
 * Announce message to screen readers
 * Centralized function to avoid duplication
 * @param {string} message - Message to announce
 */
export function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}
