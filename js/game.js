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
export async function initGame() {
  const cardGrid = document.getElementById('cardGrid');
  const loadingState = document.getElementById('loadingState');
  
  if (!cardGrid) {
    console.error('Card grid not found!');
    return;
  }

  // Show loading state
  if (loadingState) {
    loadingState.classList.remove('hidden');
    loadingState.setAttribute('aria-hidden', 'false');
  }
  cardGrid.classList.add('hidden');

  // Reset game state
  initGameState();

  // Simulate brief loading delay for better UX (optional - can be removed)
  await new Promise(resolve => setTimeout(resolve, 300));

  // Create and shuffle cards
  cards = createCardArray();

  // Render cards to grid
  renderCards(cards, cardGrid);

  // Hide loading state and show grid
  if (loadingState) {
    loadingState.classList.add('hidden');
    loadingState.setAttribute('aria-hidden', 'true');
  }
  cardGrid.classList.remove('hidden');

  // Get card elements and add click listeners
  cardElements = Array.from(document.querySelectorAll('.card'));
  cardElements.forEach((cardElement) => {
    // Click event
    cardElement.addEventListener('click', () => {
      handleCardClick(cardElement, onCardMatch, onGameWin);
    });
    
    // Keyboard navigation (Enter and Space keys)
    cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(cardElement, onCardMatch, onGameWin);
      }
    });
  });

  // Hide win message
  const winMessage = document.getElementById('winMessage');
  if (winMessage) {
    winMessage.classList.add('hidden');
    winMessage.setAttribute('aria-hidden', 'true');
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
    winMessage.classList.remove('hidden');
    winMessage.setAttribute('aria-hidden', 'false');
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


