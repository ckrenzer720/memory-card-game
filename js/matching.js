/**
 * Matching Logic
 * Handles card matching, game state, and win detection
 */

import { delay, announceToScreenReader } from './utils.js';
import { unflipCard, markCardAsMatched, disableCard, enableCard } from './cards.js';
import { playMatchSound, playMismatchSound, playFlipSound, isAudioEnabled } from './sounds.js';

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isProcessing = false;

const TOTAL_PAIRS = 8;

// Cache DOM elements
let movesElement = null;
let allCards = null;

/**
 * Initialize game state
 * Resets all game variables to their initial values
 * Called at the start of a new game or when resetting
 * 
 * State variables reset:
 * - flippedCards: Array of currently flipped cards (max 2)
 * - matchedPairs: Number of successfully matched pairs (0-8)
 * - moves: Number of moves/attempts made (starts at 0)
 * - isProcessing: Flag to prevent actions during card matching logic
 * 
 * @returns {void}
 * 
 * @example
 * initGameState(); // Reset everything for a new game
 */
export function initGameState() {
  // Reset flipped cards array (no cards are flipped initially)
  flippedCards = [];
  
  // Reset matched pairs counter (no pairs matched yet)
  matchedPairs = 0;
  
  // Reset moves counter (no moves made yet)
  moves = 0;
  
  // Reset processing flag (game is ready for input)
  isProcessing = false;
  
  // Clear cached DOM references
  allCards = null;
  
  // Update the moves display in the UI
  updateMovesDisplay();
}

/**
 * Handle card click
 * @param {HTMLElement} cardElement - Clicked card element
 * @param {Function} onMatch - Callback when cards match
 * @param {Function} onWin - Callback when game is won
 */
export async function handleCardClick(cardElement, onMatch, onWin) {
  // Early return if card is invalid - MUST be first to prevent null reference errors
  if (!cardElement || !cardElement.dataset?.cardId) {
    return;
  }

  // Prevent actions during processing or if card is already matched/flipped
  // This protects against rapid clicking and edge cases
  if (
    isProcessing || // Prevents clicks during matching check
    cardElement.classList.contains('matched') || // Prevents clicking matched cards
    cardElement.classList.contains('flipped') || // Prevents clicking same card twice
    flippedCards.includes(cardElement) // Additional check for flipped cards
  ) {
    return;
  }

  // Add to flipped cards
  flippedCards.push(cardElement);
  cardElement.classList.add('flipped');
  
  // Play flip sound if audio is enabled
  if (isAudioEnabled()) {
    playFlipSound();
  }

  // If two cards are flipped, check for match
  if (flippedCards.length === 2) {
    isProcessing = true;
    moves++;
    updateMovesDisplay();

    // Disable all cards during check (cache query result)
    if (!allCards) {
      allCards = document.querySelectorAll('.card');
    }
    allCards.forEach((card) => {
      disableCard(card);
    });

    await delay(500); // Brief delay to show both cards

    const [card1, card2] = flippedCards;
    const card1Id = parseInt(card1.dataset.cardId);
    const card2Id = parseInt(card2.dataset.cardId);

    // Check if cards match (same symbol = same id range)
    // Cards with IDs 0,1 match (symbol 0), 2,3 match (symbol 1), etc.
    const card1SymbolIndex = Math.floor(card1Id / 2);
    const card2SymbolIndex = Math.floor(card2Id / 2);

    if (card1SymbolIndex === card2SymbolIndex) {
      // Match found!
      markCardAsMatched(card1);
      markCardAsMatched(card2);
      matchedPairs++;
      onMatch && onMatch(card1, card2);
      
      // Play match sound if audio is enabled
      if (isAudioEnabled()) {
        playMatchSound();
      }
      
      // Announce match to screen readers
      announceToScreenReader(`Match found! ${matchedPairs} of ${TOTAL_PAIRS} pairs matched.`);

      // Check for win
      if (matchedPairs === TOTAL_PAIRS) {
        onWin && onWin();
      }
    } else {
      // No match - add shake animation
      card1.classList.add('mismatch');
      card2.classList.add('mismatch');
      
      // Play mismatch sound if audio is enabled
      if (isAudioEnabled()) {
        playMismatchSound();
      }
      
      // Flip back after delay
      await delay(1000);
      unflipCard(card1);
      unflipCard(card2);
      
      // Remove mismatch class after animation
      setTimeout(() => {
        card1.classList.remove('mismatch');
        card2.classList.remove('mismatch');
      }, 500);
    }

    // Reset flipped cards and re-enable
    flippedCards = [];
    isProcessing = false;

    // Re-enable all non-matched cards (use cached reference if available)
    if (allCards) {
      allCards.forEach((card) => {
        if (!card.classList.contains('matched')) {
          enableCard(card);
        }
      });
    } else {
      document.querySelectorAll('.card:not(.matched)').forEach((card) => {
        enableCard(card);
      });
    }
  }
}

/**
 * Update moves counter display
 */
function updateMovesDisplay() {
  // Cache the element on first access
  if (!movesElement) {
    movesElement = document.getElementById('moves');
  }
  if (movesElement) {
    movesElement.textContent = moves;
  }
}

/**
 * Get current move count
 * @returns {number} - Current number of moves
 */
export function getMoves() {
  return moves;
}

/**
 * Check if game is complete
 * @returns {boolean} - True if all pairs are matched
 */
export function isGameComplete() {
  return matchedPairs === TOTAL_PAIRS;
}


