/**
 * Main Game Logic
 * Initializes and manages the game
 */

import { createCardArray, renderCards } from './cards.js';
import { initGameState, handleCardClick, getMoves, isGameComplete } from './matching.js';

let cards = [];
let cardElements = [];

/**
 * Initialize the game
 */
export function initGame() {
  const cardGrid = document.getElementById('cardGrid');
  if (!cardGrid) {
    console.error('Card grid not found!');
    return;
  }

  // Reset game state
  initGameState();

  // Create and shuffle cards
  cards = createCardArray();

  // Render cards to grid
  renderCards(cards, cardGrid);

  // Get card elements and add click listeners
  cardElements = Array.from(document.querySelectorAll('.card'));
  cardElements.forEach((cardElement) => {
    cardElement.addEventListener('click', () => {
      handleCardClick(cardElement, onCardMatch, onGameWin);
    });
  });

  // Hide win message
  const winMessage = document.getElementById('winMessage');
  if (winMessage) {
    winMessage.style.display = 'none';
  }
}

/**
 * Callback when cards match
 * @param {HTMLElement} card1 - First matched card
 * @param {HTMLElement} card2 - Second matched card
 */
function onCardMatch(card1, card2) {
  // Optional: Add match sound or animation here
  console.log('Match found!');
}

/**
 * Callback when game is won
 */
function onGameWin() {
  const winMessage = document.getElementById('winMessage');
  const finalMoves = document.getElementById('finalMoves');

  if (winMessage && finalMoves) {
    finalMoves.textContent = getMoves();
    winMessage.style.display = 'block';
  }

  console.log('Congratulations! You won!');
}

/**
 * Reset the game
 */
export function resetGame() {
  initGame();
}

/**
 * Initialize event listeners for reset buttons
 * Uses event delegation to avoid duplicate listeners
 */
function setupEventListeners() {
  // Use event delegation on document to handle clicks
  document.addEventListener('click', (e) => {
    if (e.target.id === 'resetBtn' || e.target.id === 'playAgainBtn') {
      resetGame();
    }
  });
}

// Initialize game when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initGame();
  });
} else {
  setupEventListeners();
  initGame();
}


