/**
 * Matching Logic
 * Handles card matching, game state, and win detection
 */

import { delay } from './utils.js';
import { unflipCard, markCardAsMatched, disableCard, enableCard } from './cards.js';

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isProcessing = false;

const TOTAL_PAIRS = 8;

/**
 * Initialize game state
 */
export function initGameState() {
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  isProcessing = false;
  updateMovesDisplay();
}

/**
 * Handle card click
 * @param {HTMLElement} cardElement - Clicked card element
 * @param {Function} onMatch - Callback when cards match
 * @param {Function} onWin - Callback when game is won
 */
export async function handleCardClick(cardElement, onMatch, onWin) {
  // Prevent actions during processing or if card is already matched/flipped
  if (
    isProcessing ||
    cardElement.classList.contains('matched') ||
    cardElement.classList.contains('flipped') ||
    flippedCards.includes(cardElement)
  ) {
    return;
  }

  // Add to flipped cards
  flippedCards.push(cardElement);
  cardElement.classList.add('flipped');

  // If two cards are flipped, check for match
  if (flippedCards.length === 2) {
    isProcessing = true;
    moves++;
    updateMovesDisplay();

    // Disable all cards during check
    document.querySelectorAll('.card').forEach((card) => {
      disableCard(card);
    });

    await delay(500); // Brief delay to show both cards

    const [card1, card2] = flippedCards;
    const card1Id = card1.dataset.cardId;
    const card2Id = card2.dataset.cardId;

    // Check if cards match (same symbol = same id range)
    const card1SymbolIndex = Math.floor(parseInt(card1Id) / 2);
    const card2SymbolIndex = Math.floor(parseInt(card2Id) / 2);

    if (card1SymbolIndex === card2SymbolIndex) {
      // Match found!
      markCardAsMatched(card1);
      markCardAsMatched(card2);
      matchedPairs++;
      onMatch && onMatch(card1, card2);

      // Check for win
      if (matchedPairs === TOTAL_PAIRS) {
        onWin && onWin();
      }
    } else {
      // No match - flip back
      await delay(1000);
      unflipCard(card1);
      unflipCard(card2);
    }

    // Reset flipped cards and re-enable
    flippedCards = [];
    isProcessing = false;

    // Re-enable all non-matched cards
    document.querySelectorAll('.card:not(.matched)').forEach((card) => {
      enableCard(card);
    });
  }
}

/**
 * Update moves counter display
 */
function updateMovesDisplay() {
  const movesElement = document.getElementById('moves');
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

